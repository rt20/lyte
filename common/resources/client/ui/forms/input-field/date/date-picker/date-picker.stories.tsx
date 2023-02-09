import React, {useState} from 'react';
import {ComponentMeta} from '@storybook/react';
import {endOfMonth, startOfMonth} from '@internationalized/date';
import {useForm} from 'react-hook-form';
import {DatePicker, DatePickerProps, FormDatePicker} from './date-picker';
import {Option, Select} from '../../../select/select';
import {Form} from '../../../form';
import {Button} from '../../../../buttons/button';
import {useBootstrapData} from '../../../../../core/bootstrap-data/bootstrap-data-context';
import {useCurrentDateTime} from '../../../../../i18n/use-current-date-time';

export default {
  title: 'Common/Date and Time/Date Picker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

export const MinMaxStartEnd = () => {
  const now = useCurrentDateTime();
  return (
    <Wrapper
      defaultValue={now}
      min={startOfMonth(now.subtract({months: 1}))}
      max={endOfMonth(now.add({months: 1}))}
    />
  );
};

export const MinMaxStartMiddle = () => {
  const now = useCurrentDateTime();
  return (
    <Wrapper
      defaultValue={now}
      min={now.subtract({days: 14})}
      max={now.add({days: 8})}
    />
  );
};

export const InsideForm = () => {
  const now = useCurrentDateTime();
  const form = useForm({
    defaultValues: {
      date: now.toDate().toISOString(),
    },
  });

  return (
    <Form
      form={form}
      onSubmit={value => {
        console.log(value);
      }}
    >
      <div className="my-20">Form Value: {form.watch('date')}</div>
      <FormDatePicker name="date" />
      <Button variant="flat" color="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const Wrapper = (props: DatePickerProps) => {
  const {mergeBootstrapData} = useBootstrapData();
  const {min, max} = props;
  const [locale, setLocale] = useState('');
  const [calendar, setCalendar] = useState<React.Key>(calendars[0].key);

  const updateLocale = (newLocale: any) => {
    setLocale(newLocale);

    mergeBootstrapData({
      i18n: {
        lines: {},
        id: 0,
        name: newLocale,
        language: newLocale,
      },
    });

    const pref = preferences.find(p => p.locale === newLocale);
    setCalendar(pref!.ordering!.split(' ')[0]);
  };

  return (
    <div>
      <div className="max-w-950 mb-40 mx-auto gap-20 flex items-center">
        <Select
          label="Locale"
          selectionMode="single"
          selectedValue={locale}
          onSelectionChange={updateLocale}
        >
          {preferences.map(item => (
            <Option key={item.locale} value={item.locale}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          label="Calendar"
          selectionMode="single"
          selectedValue={calendar}
          onSelectionChange={setCalendar}
        >
          {calendars.map(item => {
            return (
              <Option key={item.key} value={item.key}>
                {item.name}
              </Option>
            );
          })}
        </Select>
      </div>
      {min && <div>min: {min.toString()}</div>}
      {max && <div className="mb-20">max: {max.toString()}</div>}
      <DatePicker label="Pick a date" {...props} />
    </div>
  );
};

// https://github.com/unicode-org/cldr/blob/22af90ae3bb04263f651323ce3d9a71747a75ffb/common/supplemental/supplementalData.xml#L4649-L4664
const preferences = [
  {locale: '', label: 'Default', ordering: 'gregory'},
  {
    label: 'Lithuanian',
    locale: 'lt',
    ordering: 'gregory',
  },
  {
    label: 'Arabic (Algeria)',
    locale: 'ar-DZ',
    territories: 'DJ DZ EH ER IQ JO KM LB LY MA MR OM PS SD SY TD TN YE',
    ordering: 'gregory islamic islamic-civil islamic-tbla',
  },
  {
    label: 'Arabic (United Arab Emirates)',
    locale: 'ar-AE',
    territories: 'AE BH KW QA',
    ordering: 'gregory islamic-umalqura islamic islamic-civil islamic-tbla',
  },
  {
    label: 'Arabic (Egypt)',
    locale: 'AR-EG',
    territories: 'EG',
    ordering: 'gregory coptic islamic islamic-civil islamic-tbla',
  },
  {
    label: 'Arabic (Saudi Arabia)',
    locale: 'ar-SA',
    territories: 'SA',
    ordering: 'islamic-umalqura gregory islamic islamic-rgsa',
  },
  {
    label: 'Farsi (Afghanistan)',
    locale: 'fa-AF',
    territories: 'AF IR',
    ordering: 'persian gregory islamic islamic-civil islamic-tbla',
  },
  // {territories: 'CN CX HK MO SG', ordering: 'gregory chinese'},
  {
    label: 'Amharic (Ethiopia)',
    locale: 'am-ET',
    territories: 'ET',
    ordering: 'gregory ethiopic ethioaa',
  },
  {
    label: 'Hebrew (Israel)',
    locale: 'he-IL',
    territories: 'IL',
    ordering: 'gregory hebrew islamic islamic-civil islamic-tbla',
  },
  {
    label: 'Hindi (India)',
    locale: 'hi-IN',
    territories: 'IN',
    ordering: 'gregory indian',
  },
  // {label: 'Marathi (India)', locale: 'mr-IN', territories: 'IN', ordering: 'gregory indian'},
  {
    label: 'Bengali (India)',
    locale: 'bn-IN',
    territories: 'IN',
    ordering: 'gregory indian',
  },
  {
    label: 'Japanese (Japan)',
    locale: 'ja-JP',
    territories: 'JP',
    ordering: 'gregory japanese',
  },
  // {territories: 'KR', ordering: 'gregory dangi'},
  {
    label: 'Thai (Thailand)',
    locale: 'th-TH',
    territories: 'TH',
    ordering: 'buddhist gregory',
  },
  {
    label: 'Chinese (Taiwan)',
    locale: 'zh-TW',
    territories: 'TW',
    ordering: 'gregory roc chinese',
  },
];

const calendars = [
  {key: 'gregory', name: 'Gregorian'},
  {key: 'japanese', name: 'Japanese'},
  {key: 'buddhist', name: 'Buddhist'},
  {key: 'roc', name: 'Taiwan'},
  {key: 'persian', name: 'Persian'},
  {key: 'indian', name: 'Indian'},
  {key: 'islamic-umalqura', name: 'Islamic (Umm al-Qura)'},
  {key: 'islamic-civil', name: 'Islamic Civil'},
  {key: 'islamic-tbla', name: 'Islamic Tabular'},
  {key: 'hebrew', name: 'Hebrew'},
  {key: 'coptic', name: 'Coptic'},
  {key: 'ethiopic', name: 'Ethiopic'},
  {key: 'ethioaa', name: 'Ethiopic (Amete Alem)'},
];
