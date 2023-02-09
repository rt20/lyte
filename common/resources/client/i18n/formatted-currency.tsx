import {memo} from 'react';
import {useNumberFormatter} from './use-number-formatter';

interface FormattedCurrencyProps {
  value: number;
  currency: string;
}
export const FormattedCurrency = memo(
  ({value, currency}: FormattedCurrencyProps) => {
    const formatter = useNumberFormatter({
      style: 'currency',
      currency,
    });

    if (isNaN(value)) {
      value = 0;
    }

    return <>{formatter.format(value)}</>;
  }
);
