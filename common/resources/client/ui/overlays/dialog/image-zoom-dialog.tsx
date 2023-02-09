import React from 'react';
import {useDialogContext} from './dialog-context';
import {Dialog} from './dialog';
import {DialogBody} from './dialog-body';
import {IconButton} from '@common/ui/buttons/icon-button';
import {CloseIcon} from '@common/icons/material/Close';
import {KeyboardArrowLeftIcon} from '@common/icons/material/KeyboardArrowLeft';
import {KeyboardArrowRightIcon} from '@common/icons/material/KeyboardArrowRight';
import {useControlledState} from '@react-stately/utils';

interface Props {
  image?: string;
  images?: string[];
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
  defaultActiveIndex?: number;
}
export function ImageZoomDialog(props: Props) {
  const {close} = useDialogContext();
  const {image, images} = props;
  const [activeIndex, setActiveIndex] = useControlledState(
    props.activeIndex,
    props.defaultActiveIndex,
    props.onActiveIndexChange
  );
  const src = image || images?.[activeIndex];

  return (
    <Dialog size="fullscreen" background="bg-black">
      <DialogBody padding="p-0">
        <IconButton
          size="lg"
          color="paper"
          className="absolute top-0 right-0 text-white"
          onClick={() => {
            close();
          }}
        >
          <CloseIcon />
        </IconButton>
        <div className="relative h-dialog w-dialog p-10 flex items-center justify-center">
          {images?.length && (
            <IconButton
              size="lg"
              color="paper"
              variant="flat"
              className="absolute my-auto top-0 bottom-0 left-20"
              radius="rounded"
              disabled={activeIndex < 1}
              onClick={() => {
                setActiveIndex(activeIndex - 1);
              }}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          )}
          <img
            src={src}
            alt=""
            className="max-h-full max-w-full shadow object-contain"
          />
          {images?.length && (
            <IconButton
              size="lg"
              color="paper"
              variant="flat"
              className="absolute my-auto top-0 bottom-0 right-20"
              radius="rounded"
              disabled={activeIndex + 1 === images?.length}
              onClick={() => {
                setActiveIndex(activeIndex + 1);
              }}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          )}
        </div>
      </DialogBody>
    </Dialog>
  );
}
