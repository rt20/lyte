import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Trans} from '@common/i18n/trans';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {
  ResourcePaginationParams,
  usePaginatedResources,
} from '@common/datatable/requests/paginated-resources';
import {List, ListItem} from '@common/ui/list/list';
import {Link} from '@app/dashboard/links/link';
import {useMoveLinksToGroup} from '@app/dashboard/link-groups/link-group-links-datatable-page/requests/use-move-links-to-group';
import {removeProtocol} from '@common/utils/urls/remove-protocol';
import React, {useState} from 'react';
import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Checkbox} from '@common/ui/forms/toggle/checkbox';
import {LinkImage} from '@app/dashboard/links/link-image';
import {IconButton} from '@common/ui/buttons/icon-button';
import {KeyboardArrowLeftIcon} from '@common/icons/material/KeyboardArrowLeft';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {IllustratedMessage} from '@common/ui/images/illustrated-message';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import linkSvg from '@app/dashboard/links/share-link.svg';
import {Skeleton} from '@common/ui/skeleton/skeleton';
import {AnimatePresence, m} from 'framer-motion';
import {opacityAnimation} from '@common/ui/animation/opacity-animation';

interface MoveLinksToGroupDialogProps {
  group: LinkGroup;
}
export function MoveLinksToGroupDialog({group}: MoveLinksToGroupDialogProps) {
  const {close} = useDialogContext();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [params, setParams] = useState<ResourcePaginationParams>({
    groupId: `!${group.id}`,
    query: '',
    perPage: 8,
  });
  const {data, isLoading} = usePaginatedResources<Link>('link', params);
  const pagination = data?.pagination;
  const moveLinks = useMoveLinksToGroup(group);

  const paginationButtons = (
    <div className="text-muted">
      <IconButton
        disabled={isLoading || !pagination?.prev_page}
        onClick={() => {
          setParams({
            ...params,
            page: pagination?.prev_page!,
          });
        }}
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <IconButton
        disabled={isLoading || !pagination?.next_page}
        onClick={() => {
          setParams({
            ...params,
            page: pagination?.next_page!,
          });
        }}
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </div>
  );

  const emptyStageMessage = (
    <IllustratedMessage
      image={<SvgImage src={linkSvg} />}
      title={<Trans message="No links found" />}
    />
  );

  const list = (
    <div className="min-h-[464px]">
      <List>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LinksSkeleton />
          ) : (
            <LinksList
              links={pagination?.data}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
            />
          )}
        </AnimatePresence>
      </List>
    </div>
  );

  return (
    <Dialog size="lg">
      <DialogHeader>
        <Trans message="Move links to “:group“" values={{group: group.name}} />
      </DialogHeader>
      <DialogBody>
        <TextField
          className="mb-14"
          label={<Trans message="Search for links..." />}
          value={params.query}
          onChange={e => {
            setParams({...params, query: e.target.value});
          }}
        />
        {!isLoading && !pagination?.data.length ? emptyStageMessage : list}
      </DialogBody>
      <DialogFooter startAction={paginationButtons}>
        <Button variant="text" onClick={close}>
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          onClick={() => {
            moveLinks.mutate({linkIds: selectedIds}, {onSuccess: close});
          }}
          disabled={moveLinks.isLoading}
        >
          <Trans message="Move" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface ListItemsProps {
  links?: Link[];
  selectedIds: number[];
  setSelectedIds: (ids: number[]) => void;
}
function LinksList({links, selectedIds, setSelectedIds}: ListItemsProps) {
  return (
    <m.div key="links-list" {...opacityAnimation}>
      <List>
        {(links || []).map(link => {
          const isSelected = selectedIds.includes(link.id);
          return (
            <ListItem
              key={link.id}
              isSelected={isSelected}
              onSelected={() => {
                if (isSelected) {
                  setSelectedIds(selectedIds.filter(id => id !== link.id));
                } else {
                  setSelectedIds([...selectedIds, link.id]);
                }
              }}
              startIcon={<Checkbox checked={isSelected} />}
              description={removeProtocol(link.short_url)}
            >
              <div className="flex items-center gap-8">
                <LinkImage className="w-14 h-14" link={link} />
                <div>{removeProtocol(link.long_url)}</div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </m.div>
  );
}

const skeletonCount = 8;
function LinksSkeleton() {
  return (
    <m.div key="links-skeleton" {...opacityAnimation}>
      <List>
        {Array.from({length: skeletonCount}).map((_, index) => (
          <ListItem key={index} isDisabled>
            <Skeleton variant="text" className="min-h-40" />
          </ListItem>
        ))}
      </List>
    </m.div>
  );
}
