import {
  BaseImageBg,
  ImageBackground,
  ImageBackgrounds,
} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-backgrounds';
import {BackgroundSelectorButton} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector-button';
import {BgSelectorTabProps} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {Trans} from '@common/i18n/trans';
import {UploadIcon} from '@common/icons/material/Upload';
import {useForm} from 'react-hook-form';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {Form} from '@common/ui/forms/form';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {BackgroundPositionSelector} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-background-tab/background-position-selector';
import {cssPropsFromBgConfig} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/css-props-from-bg-config';

export function ImageBackgroundTab({
  value,
  onChange,
  className,
}: BgSelectorTabProps<ImageBackground>) {
  return (
    <div>
      <div className={className}>
        <CustomImageTrigger value={value} onChange={onChange} />
        {ImageBackgrounds.map(background => (
          <BackgroundSelectorButton
            key={background.id}
            onClick={() =>
              onChange?.({
                ...BaseImageBg,
                ...background,
              })
            }
            isActive={value?.id === background.id}
            style={{
              ...cssPropsFromBgConfig(background),
              backgroundAttachment: 'initial',
            }}
            label={<Trans {...background.label} />}
          />
        ))}
      </div>
      <BackgroundPositionSelector value={value} onChange={onChange} />
    </div>
  );
}

interface CustomImageTrigger {
  value?: ImageBackground;
  onChange?: (value: ImageBackground | null) => void;
}
function CustomImageTrigger({value, onChange}: CustomImageTrigger) {
  // only seed form with custom uploaded image
  value = value?.id === BaseImageBg.id ? value : undefined;
  return (
    <DialogTrigger
      type="popover"
      onClose={(imageUrl?: string) => {
        onChange?.(
          imageUrl
            ? {
                ...BaseImageBg,
                backgroundImage: `url(${imageUrl})`,
              }
            : null
        );
      }}
    >
      <BackgroundSelectorButton
        label={<Trans {...BaseImageBg.label} />}
        isActive={value?.id === BaseImageBg.id}
        className="border-dashed border-2"
        style={cssPropsFromBgConfig(value)}
      >
        <span className="inline-block text-white bg-black/20 rounded p-10">
          <UploadIcon size="lg" />
        </span>
      </BackgroundSelectorButton>
      <CustomImageDialog value={value} />
    </DialogTrigger>
  );
}

interface CustomImageDialogProps {
  value?: ImageBackground;
}
export function CustomImageDialog({value}: CustomImageDialogProps) {
  const defaultValue = value?.backgroundImage
    ?.replace('url(', '')
    .replace(')', '');
  const form = useForm<{imageUrl: string}>({
    defaultValues: {imageUrl: defaultValue},
  });
  const {close, formId} = useDialogContext();
  return (
    <Dialog size="sm">
      <DialogHeader>
        <Trans message="Upload image" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={values => {
            close(values.imageUrl);
          }}
        >
          <FileUploadProvider>
            <FormImageSelector
              autoFocus
              name="imageUrl"
              diskPrefix="biolinks"
              showRemoveButton
            />
          </FileUploadProvider>
        </Form>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button variant="flat" color="primary" type="submit" form={formId}>
          <Trans message="Select" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
