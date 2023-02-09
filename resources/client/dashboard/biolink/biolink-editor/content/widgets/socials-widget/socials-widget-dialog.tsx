import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';
import {CrupdateWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/crupdate-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {
  SocialsList,
  SocialsType,
} from '@app/dashboard/biolink/biolink-editor/content/widgets/socials-widget/socials-list';
import {removeEmptyValuesFromObject} from '@common/utils/objects/remove-empty-values-from-object';

export interface SocialsWidget extends BiolinkWidget {
  type: WidgetType.Text;
  config: Record<SocialsType, string>;
}

interface TextWidgetDialogProps {
  biolink: Biolink;
  widget?: SocialsWidget;
}
export function SocialsWidgetDialog({biolink, widget}: TextWidgetDialogProps) {
  return (
    <CrupdateWidgetDialog
      biolink={biolink}
      type={WidgetType.Socials}
      widget={widget}
      onSubmit={values => {
        // remove key from object, if user empties social's input
        return Promise.resolve(removeEmptyValuesFromObject(values));
      }}
    >
      {Object.entries(SocialsList).map(([type, social], index) => {
        const Icon = social.icon;
        return (
          <FormTextField
            autoFocus={index === 0}
            key={type}
            className="mb-24"
            name={type}
            placeholder={social.placeholder}
            label={<Trans {...social.name} />}
            pattern={social.pattern}
            type={social.inputType}
            autoComplete="off"
            startAdornment={Icon && <Icon />}
          />
        );
      })}
    </CrupdateWidgetDialog>
  );
}
