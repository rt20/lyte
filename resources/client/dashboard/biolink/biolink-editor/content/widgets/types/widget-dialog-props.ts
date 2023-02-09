import {Biolink, BiolinkWidget} from '@app/dashboard/biolink/biolink';

export interface WidgetDialogProps<T extends BiolinkWidget = BiolinkWidget> {
  biolink: Biolink;
  widget?: T;
}
