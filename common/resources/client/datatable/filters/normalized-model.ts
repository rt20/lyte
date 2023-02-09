import {Key} from 'react';

export interface NormalizedModel {
  id: Key;
  name: string;
  description?: string;
  image?: string;
  model_type: string;
}
