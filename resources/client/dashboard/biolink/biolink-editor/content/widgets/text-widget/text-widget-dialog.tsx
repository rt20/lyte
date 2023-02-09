import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';

export interface TextWidget extends BiolinkWidget {
  type: WidgetType.Text;
  config: {
    title: string;
    description?: string;
  };
}

interface TextWidgetDialogProps {
  biolink: Biolink;
  widget?: TextWidget;
}
export function TextWidgetDialog({biolink, widget}: TextWidgetDialogProps) {
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Text}
      widget={widget}
    >
      <FormTextField
        className="mb-24"
        required
        autoFocus
        name="title"
        label={<Trans message="Title" />}
      />
      <FormTextField
        name="description"
        label={<Trans message="Description" />}
      />
    </CrupdateWidgetDialog>
  );
}
