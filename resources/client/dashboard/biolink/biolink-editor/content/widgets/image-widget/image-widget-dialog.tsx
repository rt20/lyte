import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {FormImageSelector} from '@common/ui/images/image-selector';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {FormSelect} from '@common/ui/forms/select/select';
import {Item} from '@common/ui/forms/listbox/item';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {WidgetDialogProps} from '@app/dashboard/biolink/biolink-editor/content/widgets/types/widget-dialog-props';

export interface ImageWidget extends BiolinkWidget {
  type: WidgetType.Image;
  config: {
    url: string;
    destinationUrl?: string;
    type: 'default' | 'avatar';
  };
}

export function ImageWidgetDialog({
  biolink,
  widget,
}: WidgetDialogProps<ImageWidget>) {
  const {trans} = useTrans();
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Image}
      widget={widget}
    >
      <FileUploadProvider>
        <FormImageSelector name="url" diskPrefix="widgets" required />
      </FileUploadProvider>
      <FormSelect
        className="my-24"
        name="type"
        label={<Trans message="Style" />}
        selectionMode="single"
      >
        <Item value="default">
          <Trans message="Default" />
        </Item>
        <Item value="avatar">
          <Trans message="Avatar" />
        </Item>
      </FormSelect>
      <FormTextField
        placeholder={trans(message('Optional'))}
        name="destinationUrl"
        type="url"
        label={<Trans message="Destination url" />}
        description={
          <Trans message="Redirect user to this url when clicking the image." />
        }
      />
    </CrupdateWidgetDialog>
  );
}
