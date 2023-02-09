import React, {ReactNode} from 'react';
import {Avatar} from '../../ui/images/avatar';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {Part} from 'lit';
import clsx from 'clsx';

interface Props {
  image?: string;
  label: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
}
export function NameWithAvatar({
  image,
  label,
  description,
  labelClassName,
}: Props) {
  return (
    <div className="flex items-center gap-12 w-max">
      {image && <Avatar size="md" className="flex-shrink-0" src={image} />}
      <div>
        <div className={labelClassName}>{label}</div>
        {description && <div className="text-muted text-xs">{description}</div>}
      </div>
    </div>
  );
}

export function NameWithAvatarPlaceholder({
  labelClassName,
  showDescription,
}: Partial<Props> & {
  showDescription?: boolean;
}) {
  return (
    <div className="flex items-center gap-12 w-full max-w-4/5">
      <Skeleton size="w-32 h-32" />
      <div className="flex-auto">
        <div className={clsx(labelClassName, 'leading-3')}>
          <Skeleton />
        </div>
        {showDescription && (
          <div className="text-muted leading-3 mt-4">{<Skeleton />}</div>
        )}
      </div>
    </div>
  );
}
