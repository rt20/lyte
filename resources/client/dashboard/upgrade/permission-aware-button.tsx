import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  useMemo,
  useState,
} from 'react';
import {
  FetchLinkUsageResponse,
  useLinkSummary,
} from '@app/dashboard/layout/sidenav/use-link-summary';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {OverQuotaDialog} from '@app/dashboard/upgrade/over-quota-dialog';
import {resourceTranslationMap} from '@app/dashboard/layout/sidenav/resource-usage-list';
import {createEventHandler} from '@common/utils/dom/create-event-handler';
import {Link} from '@app/dashboard/links/link';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {CustomPage} from '@common/admin/custom-pages/custom-page';
import {CustomDomain} from '@common/custom-domains/custom-domain';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {TrackingPixel} from '@app/dashboard/tracking-pixels/tracking-pixel';
import {useAuth} from '@common/auth/use-auth';

type ResourceName =
  | Link['model_type']
  | Biolink['model_type']
  | LinkOverlay['model_type']
  | CustomPage['model_type']
  | CustomDomain['model_type']
  | LinkGroup['model_type']
  | TrackingPixel['model_type'];

interface PermissionAwareButtonProps {
  resource:
    | ResourceName
    | Link
    | LinkGroup
    | Biolink
    | CustomDomain
    | LinkOverlay
    | CustomPage
    | TrackingPixel;
  action: 'create' | 'update' | 'delete';
  children: ReactElement;
}

export const PermissionAwareButton = forwardRef<
  HTMLElement,
  PermissionAwareButtonProps
>(({children, resource, action, ...childProps}, ref) => {
  const {user} = useAuth();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const {data} = useLinkSummary();

  const usageKey = useMemo(() => {
    // extract model type from resource
    const resourceName =
      typeof resource === 'string' ? resource : resource.model_type;

    // pluralize model type and convert to snake case
    return `${camelCaseToSnakeCase(
      resourceName
    )}s` as keyof FetchLinkUsageResponse['usage'];
  }, [resource]);

  const hasPermission = data?.usage[usageKey][action];
  const messageType = data?.usage[usageKey].createMsgType;

  // user has permission or owns the resource
  if (
    hasPermission ||
    (typeof resource === 'object' && resource.user_id === user?.id)
  ) {
    return cloneElement(children, {...childProps, ref});
  }

  if (!hasPermission && messageType !== 'overQuota') {
    return null;
  }

  return (
    <div
      onPointerDown={createEventHandler(e => {
        e.preventDefault();
        e.stopPropagation();
      })}
      onClickCapture={createEventHandler(e => {
        e.preventDefault();
        e.stopPropagation();
        setDialogIsOpen(true);
      })}
      onKeyDownCapture={createEventHandler(event => {
        const e = event as unknown as KeyboardEvent;
        e.preventDefault();
        e.stopPropagation();
        if (e.key === 'Enter' || e.key === ' ') {
          setDialogIsOpen(true);
        }
      })}
    >
      {children}
      <DialogTrigger
        type="modal"
        isOpen={dialogIsOpen}
        onOpenChange={setDialogIsOpen}
      >
        <OverQuotaDialog resourceName={resourceTranslationMap[usageKey]} />
      </DialogTrigger>
    </div>
  );
});

function camelCaseToSnakeCase(str: string) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}
