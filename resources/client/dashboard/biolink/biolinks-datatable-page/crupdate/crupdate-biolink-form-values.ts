import {Biolink} from '@app/dashboard/biolink/biolink';
import {LinkeableFormValues} from '@app/dashboard/links/utils/build-linkeable-payload';

export interface CrupdateBiolinkFormValues
  extends Omit<Biolink, 'id' | 'utm'>,
    LinkeableFormValues {}
