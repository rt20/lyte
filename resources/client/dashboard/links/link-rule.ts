export interface LinkRule {
  type: 'geo' | 'device' | 'platform' | 'exp_clicks';
  link_id: number;
  key: string;
  value: string;
}
