import React, {Fragment, useRef, useState} from 'react';
import {DraggableId, DragPreviewRenderer, useDraggable} from './use-draggable';
import {useDroppable} from './use-droppable';
import clsx from 'clsx';
import {DragPreview} from './drag-preview';

export default {
  title: 'Common/Interactions/DragTarget',
};

export const Default = () => {
  return (
    <div>
      <Draggable />
      <Draggable customPreview />
      <div className="fixed inset-0 m-auto w-[210px] h-100 flex gap-10">
        <DropTarget id="one" />
        <DropTarget id="two" />
      </div>
    </div>
  );
};

interface DraggableProps {
  customPreview?: boolean;
}
function Draggable({customPreview}: DraggableProps) {
  const ref = useRef<HTMLDivElement>(null);
  const previewRef = useRef<DragPreviewRenderer>(null);
  const {draggableProps} = useDraggable({
    id: 'test',
    type: 'storybook',
    getData: () => 'storybook',
    ref,
    preview: customPreview ? previewRef : undefined,
  });
  return (
    <Fragment>
      <div
        className="bg-alt border rounded p-10 m-10 w-max"
        ref={ref}
        {...draggableProps}
      >
        {customPreview ? 'Custom Preview' : 'Default Preview'}
      </div>
      <DragPreview ref={previewRef}>
        {() => (
          <div className="p-6 rounded shadow bg-primary-light text-primary">
            Custom preview
          </div>
        )}
      </DragPreview>
    </Fragment>
  );
}

interface DropTargetProps {
  id: DraggableId;
}
function DropTarget({id}: DropTargetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const {droppableProps} = useDroppable<HTMLDivElement>({
    id,
    types: ['storybook'],
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    ref,
  });
  return (
    <div
      {...droppableProps}
      ref={ref}
      className={clsx(
        'w-100 h-100 border rounded flex items-center justify-center',
        isDragOver ? 'bg-positive' : 'bg-alt'
      )}
    >
      Drop target
    </div>
  );
}
