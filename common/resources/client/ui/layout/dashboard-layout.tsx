import {ComponentPropsWithoutRef, useCallback, useMemo} from 'react';
import {
  DashboardLayoutContext,
  DashboardSidenavStatus,
} from './dashboard-layout-context';
import {Underlay} from '../overlays/underlay';
import {AnimatePresence} from 'framer-motion';
import {useControlledState} from '@react-stately/utils';
import {useMediaQuery} from '../../utils/hooks/use-media-query';
import {
  getFromLocalStorage,
  setInLocalStorage,
} from '../../utils/hooks/local-storage';
import {useBlockBodyOverflow} from '../../utils/hooks/use-block-body-overflow';

interface DashboardLayoutProps extends ComponentPropsWithoutRef<'div'> {
  name: string;
  leftSidenavCanBeCompact?: boolean;
  leftSidenavStatus?: DashboardSidenavStatus;
  onLeftSidenavChange?: (status: DashboardSidenavStatus) => void;
  rightSidenavStatus?: DashboardSidenavStatus;
  onRightSidenavChange?: (status: DashboardSidenavStatus) => void;
}
export function DashboardLayout({
  children,
  leftSidenavStatus: leftSidenav,
  onLeftSidenavChange,
  rightSidenavStatus: rightSidenav,
  onRightSidenavChange,
  name,
  leftSidenavCanBeCompact,
  ...domProps
}: DashboardLayoutProps) {
  useBlockBodyOverflow();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const isCompactModeInitially = useMemo(() => {
    return !name ? false : getFromLocalStorage(`${name}.sidenav.compact`);
  }, [name]);
  const defaultLeftSidenavStatus = isCompactModeInitially ? 'compact' : 'open';
  const [leftSidenavStatus, setLeftSidenavStatus] = useControlledState(
    leftSidenav,
    isMobile ? 'closed' : defaultLeftSidenavStatus,
    onLeftSidenavChange
  );

  const rightSidenavStatusDefault = useMemo(() => {
    const userSelected = getFromLocalStorage(
      `${name}.sidenav.right.position`,
      'open'
    );
    return isMobile ? 'closed' : userSelected;
  }, [isMobile, name]);
  const [rightSidenavStatus, _setRightSidenavStatus] = useControlledState(
    rightSidenav,
    rightSidenavStatusDefault,
    onRightSidenavChange
  );
  const setRightSidenavStatus = useCallback(
    (status: DashboardSidenavStatus) => {
      _setRightSidenavStatus(status);
      setInLocalStorage(`${name}.sidenav.right.position`, status);
    },
    [_setRightSidenavStatus, name]
  );

  const shouldShowUnderlay =
    isMobile && (leftSidenavStatus === 'open' || rightSidenavStatus === 'open');

  return (
    <DashboardLayoutContext.Provider
      value={{
        leftSidenavStatus,
        setLeftSidenavStatus,
        rightSidenavStatus,
        setRightSidenavStatus,
        leftSidenavCanBeCompact,
        name,
        isMobileMode: isMobile,
      }}
    >
      <div
        {...domProps}
        className="dashboard-grid test-overflow h-full relative isolate"
      >
        {children}
        <AnimatePresence>
          {shouldShowUnderlay && (
            <Underlay
              position="fixed"
              key="dashboard-underlay"
              onClick={() => {
                setLeftSidenavStatus('closed');
                setRightSidenavStatus('closed');
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </DashboardLayoutContext.Provider>
  );
}
