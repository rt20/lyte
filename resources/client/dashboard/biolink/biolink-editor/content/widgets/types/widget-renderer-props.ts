import {BiolinkWidget} from '@app/dashboard/biolink/biolink';

export interface WidgetRendererProps<T extends BiolinkWidget = BiolinkWidget> {
  widget: T;
  variant: 'editor' | 'biolinkPage';
}
