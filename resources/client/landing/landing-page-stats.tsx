import {Trans} from '@common/i18n/trans';
import {useLandingPageStats} from '@app/landing/use-landing-page-stats';
import {LinkIcon} from '@common/icons/material/Link';
import {cloneElement, ReactElement} from 'react';
import {SvgIconProps} from '@common/icons/svg-icon';
import {MouseIcon} from '@common/icons/material/Mouse';
import {PersonIcon} from '@common/icons/material/Person';
import {FormattedNumber} from '@common/i18n/formatted-number';

export function LandingPageStats() {
  const {data} = useLandingPageStats();

  if (!data) return null;

  return (
    <div className="landing-container py-90 border-t flex gap-60 justify-between overflow-x-auto">
      <StatLayout
        label={<Trans message="Total links shortened" />}
        icon={<LinkIcon />}
        number={data.stats.links}
      />
      <StatLayout
        label={<Trans message="Total link clicks" />}
        icon={<MouseIcon />}
        number={data.stats.clicks}
      />
      <StatLayout
        label={<Trans message="Users signed up" />}
        icon={<PersonIcon />}
        number={data.stats.users}
      />
    </div>
  );
}

interface StatLayoutProps {
  label: ReactElement;
  icon: ReactElement<SvgIconProps>;
  number: number;
}
function StatLayout({label, icon, number}: StatLayoutProps) {
  return (
    <div className="flex items-center">
      {cloneElement(icon, {size: 'xl'})}
      <div className="border-l border-l-2 pl-24 ml-24">
        <div className="whitespace-nowrap uppercase text-[15px]">{label}</div>
        <div className="text-3xl font-medium mt-6">
          <FormattedNumber value={number} />
        </div>
      </div>
    </div>
  );
}
