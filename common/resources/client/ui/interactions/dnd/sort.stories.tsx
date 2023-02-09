import React, {useRef, useState} from 'react';
import clsx from 'clsx';
import {moveItemInArray} from '../../../utils/array/move-item-in-array';
import {IconButton} from '../../buttons/icon-button';
import {DragHandleIcon} from '../../../icons/material/DragHandle';
import {useSortable, UseSortableProps} from './use-sortable';

export default {
  title: 'Common/Interactions/Sort',
};

export const Default = () => {
  return <SortableList />;
};

export const WithMargin = () => {
  return <SortableList withMargin />;
};

export const DragHandles = () => {
  return <SortableList dragHandles />;
};

export const WindowScrollable = () => {
  return <SortableList windowScrollable />;
};

export const Multiple = () => {
  return (
    <div className="flex items-center bg-alt w-full h-full">
      <SortableList prefix={100} />
      <SortableList />
    </div>
  );
};

interface SortableListProps {
  withMargin?: boolean;
  windowScrollable?: boolean;
  dragHandles?: boolean;
  prefix?: number;
}
function SortableList({
  withMargin,
  windowScrollable,
  dragHandles,
  prefix = 0,
}: SortableListProps) {
  const [items, setItems] = useState(
    [...Array(20).keys()].map(key => key + prefix)
  );

  return (
    <div
      className={clsx(
        'bg-alt w-full h-full flex justify-center',
        windowScrollable ? 'overflow-y-auto' : 'items-center'
      )}
    >
      <div
        className={clsx(
          'w-384 h-max mx-auto border rounded scroll-container',
          !windowScrollable && 'overflow-y-auto max-h-[583px]'
        )}
      >
        {items.map(number => (
          <Sortable
            dragHandle={dragHandles}
            key={number}
            type="story"
            item={number}
            items={items}
            onSortEnd={(oldIndex, newIndex) => {
              setItems([...moveItemInArray(items, oldIndex, newIndex)]);
            }}
            className={clsx(
              'p-14 bg-paper flex items-center gap-24',
              withMargin ? 'border-y mb-10' : 'border-b'
            )}
          />
        ))}
      </div>
    </div>
  );
}

interface SortableProps extends Omit<UseSortableProps, 'ref'> {
  className: string;
  dragHandle?: boolean;
}
function Sortable(props: SortableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const {dragHandle, className, item} = props;
  const {sortableProps, dragHandleRef} = useSortable({...props, ref});

  return (
    <div {...sortableProps} ref={ref} className={className}>
      {dragHandle && (
        <IconButton size="md" className="text-muted" ref={dragHandleRef}>
          <DragHandleIcon />
        </IconButton>
      )}
      <div>{`Item ${item}`}</div>
    </div>
  );
}
