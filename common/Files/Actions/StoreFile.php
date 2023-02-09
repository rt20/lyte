<?php

namespace Common\Files\Actions;

use Common\Files\FileEntryPayload;
use Illuminate\Contracts\Filesystem\Filesystem;
use Illuminate\Filesystem\FilesystemManager;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Arr;
use League\Flysystem\Local\LocalFilesystemAdapter;
use Storage;

class StoreFile
{
    protected Filesystem $disk;
    protected array $diskOptions;
    protected FileEntryPayload $payload;

    public function execute(
        FileEntryPayload $payload,
        array $fileOptions,
    ): string|false {
        $this->disk = $payload->public
            ? Storage::disk('public')
            : Storage::disk('uploads');

        $this->diskOptions = [
            'mimetype' => $payload->clientMime,
            'visibility' => $payload->visibility,
        ];

        $this->payload = $payload;

        if (
            $payload->filename === '.htaccess' ||
            ($payload->public &&
                ($payload->clientExtension === 'php' ||
                    $fileOptions['file']?->getMimeType() ===
                        'application/x-php'))
        ) {
            abort(403);
        }

        if (isset($fileOptions['file'])) {
            return $this->storeUploadedFile($fileOptions['file']);
        } elseif (isset($fileOptions['contents'])) {
            return $this->storeStringContents($fileOptions['contents']);
        } elseif (isset($fileOptions['path'])) {
            // if source and destination is local (and not temp dir) move file
            // instead of copying or using streams as this will be a lot faster
            if (
                Arr::get($fileOptions, 'moveFile') === true &&
                $this->disk->getAdapter() instanceof LocalFilesystemAdapter
            ) {
                return $this->storeLocalFile($fileOptions['path']);
            } else {
                return $this->storeUploadedFile(new File($fileOptions['path']));
            }
        }

        return false;
    }

    protected function storeUploadedFile(File|UploadedFile $file): string|false
    {
        return $this->disk->putFileAs(
            $this->payload->diskPrefix,
            $file,
            $this->payload->filename,
            $this->diskOptions,
        );
    }

    protected function storeStringContents(string $contents): string|false
    {
        return $this->disk->put(
            "{$this->payload->diskPrefix}/{$this->payload->filename}",
            $contents,
            $this->diskOptions,
        );
    }

    protected function storeLocalFile(string $sourcePath): string|false
    {
        // local driver at the root of filesystem
        $local = app(FilesystemManager::class)->createLocalDriver(
            array_merge(
                [
                    'root' => '/',
                ],
                $this->diskOptions,
            ),
        );

        $pathPrefix = $this->disk->path('');
        return $local->move(
            $sourcePath,
            // prefix path with local uploads folder location
            "$pathPrefix/{$this->payload->diskPrefix}/{$this->payload->filename}",
        );
    }
}
