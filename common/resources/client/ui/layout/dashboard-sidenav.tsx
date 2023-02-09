import clsx from 'clsx';
import {m} from 'framer-motion';
import {cloneElement, ReactElement, useContext} from 'react';
import {DashboardLayoutContext} from './dashboard-layout-context';

export interface SidenavProps {
  className?: string;
  children: ReactElement;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}
export function DashboardSidenav({
  className,
  position,
  children,
  ...props
}: SidenavProps) {
  const {
    isMobileMode,
    leftSidenavStatus,
    setLeftSidenavStatus,
    rightSidenavStatus,
    setRightSidenavStatus,
  } = useContext(DashboardLayoutContext);
  const status = position === 'left' ? leftSidenavStatus : rightSidenavStatus;

  const variants = {
    open: {display: 'flex', width: null as any},
    compact: {
      display: 'flex',
      width: null as any,
    },
    closed: {
      width: 0,
      transitionEnd: {
        display: 'none',
      },
    },
  };

  const size = getSize(status === 'compact' ? 'compact' : props.size);

  return (
    <m.div
      variants={variants}
      initial={false}
      animate={status}
      transition={{type: 'tween', duration: 0.15}}
      onClick={e => {
        // close sidenav when user clicks a link or button on mobile
        const target = e.target as HTMLElement;
        if (isMobileMode && (target.closest('button') || target.closest('a'))) {
          setLeftSidenavStatus('closed');
          setRightSidenavStatus('closed');
        }
      }}
      className={clsx(
        className,
        position === 'left'
          ? 'dashboard-grid-sidenav-left'
          : 'dashboard-grid-sidenav-right',
        'overflow-hidden will-change-[width]',
        size.width,
        isMobileMode && 'fixed top-0 bottom-0 z-20 shadow-xl',
        isMobileMode && position === 'left' && 'left-0',
        isMobileMode && position === 'right' && 'right-0'
      )}
    >
      {cloneElement(children, {
        className: clsx(
          children.props.className,
          size.minWidth,
          'h-full',
          status === 'compact' && 'compact-scrollbar'
        ),
        isCompactMode: status === 'compact',
      })}
    </m.div>
  );
}

function getSize(size: SidenavProps['size'] | 'compact') {
  switch (size) {
    case 'compact':
      return {width: 'w-80', minWidth: 'min-w-80'};
    case 'sm':
      return {width: 'w-224', minWidth: 'min-w-224'};
    case 'lg':
      return {width: 'w-288', minWidth: 'min-w-288'};
    default:
      return {width: 'w-240', minWidth: 'min-w-240'};
  }
}
