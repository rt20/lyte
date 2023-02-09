import clsx from 'clsx';
import {FileTypeIcon} from './file-type-icon';
import {useFileEntryUrls} from '../hooks/file-entry-urls';
import {useTrans} from '../../i18n/use-trans';
import {FileEntry} from '../file-entry';

interface Props {
  file: FileEntry;
  className?: string;
  iconClassName?: string;
  showImage?: boolean;
}
export function FileThumbnail({
  file,
  className,
  iconClassName,
  showImage = true,
}: Props) {
  const {trans} = useTrans();
  const {previewUrl} = useFileEntryUrls(file, {thumbnail: true});

  if (showImage && file.type === 'image' && previewUrl) {
    const alt = trans({
      message: ':fileName thumbnail',
      values: {fileName: file.name},
    });
    return (
      <img
        className={clsx(className, 'object-cover')}
        src={previewUrl}
        alt={alt}
        draggable={false}
      />
    );
  }
  return <FileTypeIcon className={iconClassName} type={file.type} />;
}
