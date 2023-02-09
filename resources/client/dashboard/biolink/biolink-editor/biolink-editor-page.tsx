import {Tabs} from '@common/ui/tabs/tabs';
import {TabList} from '@common/ui/tabs/tab-list';
import {Tab} from '@common/ui/tabs/tab';
import {Trans} from '@common/i18n/trans';
import {TabPanel, TabPanels} from '@common/ui/tabs/tab-panels';
import {Fragment, ReactElement, useEffect, useState} from 'react';
import {Button} from '@common/ui/buttons/button';
import {WidgetsIcon} from '@common/icons/material/Widgets';
import {
  LinkContentItem,
  linkDialogHiddenFields,
} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/link-content-item';
import {DialogTrigger} from '@common/ui/overlays/dialog/dialog-trigger';
import {CreateLinkDialog} from '@app/dashboard/links/dialogs/create-link-dialog';
import {BiolinkSettingsForm} from '@app/dashboard/biolink/biolink-editor/biolink-settings-form';
import {SelectWidgetDialog} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-selector/select-widget-dialog';
import {WidgetType} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-list';
import {NewWidgetDialogContainer} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-selector/new-widget-dialog-container';
import {WidgetContentItem} from '@app/dashboard/biolink/biolink-editor/content/widgets/widget-content-item';
import {LivePreview} from '@app/dashboard/biolink/biolink-editor/live-preview';
import {BiolinkAppearanceEditor} from '@app/dashboard/biolink/biolink-editor/appearance/biolink-appearance-editor';
import {Link, useParams} from 'react-router-dom';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';
import {BiolinkContentItemLayout} from '@app/dashboard/biolink/biolink-editor/content/biolink-content-item-layout';
import {prefetchLinkFormValueLists} from '@app/dashboard/links/requests/use-link-form-value-lists';
import {
  setEditorBiolink,
  useEditorBiolink,
} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import notifySvg from '@common/notifications/empty-state/notify.svg';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {LinkIcon} from '@common/icons/material/Link';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import {LinkStyle} from '@common/ui/buttons/external-link';
import {ShareLinkButton} from '@app/dashboard/links/sharing/share-link-button';

const TabsMap: Record<string, number> = {
  content: 0,
  appearance: 1,
  settings: 2,
};

export function BiolinkEditorPage() {
  return (
    <div>
      <BiolinkEditorHeader />
      <div className="flex gap-60 p-24 container mx-auto">
        <BiolinkEditor />
        <LivePreview />
      </div>
    </div>
  );
}

function BiolinkEditorHeader() {
  const {biolink} = useEditorBiolink();
  return (
    <header className="border-b px-10 py-4 flex items-center gap-10 min-h-46">
      <LinkIcon className="text-muted" />
      <AnimatePresence>
        {biolink && (
          <m.a
            key="link"
            className={LinkStyle}
            href={biolink?.short_url}
            target="_blank"
            rel="noreferrer"
            {...opacityAnimation}
          >
            {removeProtocol(biolink.short_url)}
          </m.a>
        )}
        {biolink && (
          <m.div {...opacityAnimation} key="share-button" className="ml-auto">
            <ShareLinkButton variant="text" link={biolink} />
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function BiolinkEditor() {
  const {biolinkId} = useParams();
  const {tabName = 'content'} = useParams();
  const selectedTab = TabsMap[tabName] ?? TabsMap.content;
  useEditorBiolink();

  useEffect(() => {
    prefetchLinkFormValueLists();
  }, [biolinkId]);

  return (
    <div className="flex-auto min-w-0">
      <Tabs overflow="overflow-visible" selectedTab={selectedTab} isLazy>
        <TabList className="sticky top-0 bg dark:bg-alt z-10">
          <Tab
            padding="w-140"
            elementType={Link}
            to="../content"
            relative="path"
          >
            <Trans message="Content" />
          </Tab>
          <Tab
            padding="w-140"
            elementType={Link}
            to="../appearance"
            relative="path"
          >
            <Trans message="Appearance" />
          </Tab>
          <Tab
            padding="w-140"
            elementType={Link}
            to="../settings"
            relative="path"
          >
            <Trans message="Settings" />
          </Tab>
        </TabList>
        <TabPanels className="py-20">
          <TabPanel>{<BiolinkContent />}</TabPanel>
          <TabPanel>{<BiolinkAppearanceEditor />}</TabPanel>
          <TabPanel>
            <BiolinkSettingsForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

function BiolinkContent() {
  const {isLoading, status, biolink} = useEditorBiolink();
  const [activeWidgetDialog, setActiveWidgetDialog] =
    useState<WidgetType | null>(null);

  let renderedContent: ReactElement;

  if (status === 'success' && !biolink?.content.length) {
    renderedContent = (
      <m.div {...opacityAnimation} key="no-results">
        <IllustratedMessage
          className="mt-60"
          image={<SvgImage src={notifySvg} />}
          title={<Trans message="This biolink does not have any content yet" />}
        />
      </m.div>
    );
  } else if (isLoading) {
    renderedContent = <LoadingSkeleton />;
  } else {
    renderedContent = <BiolinkItemList biolink={biolink!} />;
  }

  return (
    <Fragment>
      {biolink && (
        <NewWidgetDialogContainer
          biolink={biolink}
          activeWidget={activeWidgetDialog}
          onOpenChange={isOpen => {
            if (!isOpen) {
              setActiveWidgetDialog(null);
            }
          }}
        />
      )}
      <div className="mb-20">
        <AddNewLinkButton />
        <DialogTrigger
          type="modal"
          onClose={(widgetType?: WidgetType) => {
            if (widgetType) {
              setActiveWidgetDialog(widgetType);
            }
          }}
        >
          <Button color="primary" variant="outline" startIcon={<WidgetsIcon />}>
            <Trans message="Add widget" />
          </Button>
          <SelectWidgetDialog />
        </DialogTrigger>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {renderedContent}
      </AnimatePresence>
    </Fragment>
  );
}

interface BiolinkItemListProps {
  biolink: Biolink;
}
function BiolinkItemList({biolink}: BiolinkItemListProps) {
  return (
    <m.div key="content" {...opacityAnimation}>
      {biolink?.content.map(contentItem => {
        const ContentItem =
          contentItem.model_type === 'biolinkWidget'
            ? WidgetContentItem
            : LinkContentItem;
        return (
          <ContentItem
            key={`${contentItem.model_type}-${contentItem.id}`}
            item={contentItem as never}
            biolink={biolink}
          />
        );
      })}
    </m.div>
  );
}

function AddNewLinkButton() {
  const {biolink, biolinkId} = useEditorBiolink();
  const endpoint = `biolink/${biolinkId}/link`;

  const position = biolink?.content.filter(x => x.pinned).length;

  return (
    <DialogTrigger type="modal">
      <Button color="primary" variant="flat" className="mr-14 min-w-144">
        <Trans message="Add a link" />
      </Button>
      <CreateLinkDialog
        endpoint={endpoint}
        position={position}
        group={biolink}
        hiddenFields={linkDialogHiddenFields}
        showButtonLabelField
        invalidateQueries={false}
        onSuccess={(response: {biolink: Biolink}) => {
          setEditorBiolink(response.biolink);
        }}
      />
    </DialogTrigger>
  );
}

function LoadingSkeleton() {
  return (
    <m.div key="loading-skeleton" {...opacityAnimation}>
      {[...Array(4).keys()].map((value, index) => (
        <BiolinkSkeleton key={index} />
      ))}
    </m.div>
  );
}

function BiolinkSkeleton() {
  return (
    <BiolinkContentItemLayout
      title={<Skeleton className="mb-14 text-sm max-w-192" />}
      actionRow={<Skeleton className="text-xs max-w-288" />}
    >
      <Skeleton className="text-xs max-w-400" />
      <Skeleton className="text-xs max-w-400" />
    </BiolinkContentItemLayout>
  );
}
