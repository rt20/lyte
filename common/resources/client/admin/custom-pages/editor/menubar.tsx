import React, {useState} from 'react';
import clsx from 'clsx';
import {AnimatePresence, m} from 'framer-motion';
import {Divider} from '../../../text-editor/menubar/divider';
import {FontStyleButtons} from '../../../text-editor/menubar/font-style-buttons';
import {ListButtons} from '../../../text-editor/menubar/list-buttons';
import {LinkButton} from '../../../text-editor/menubar/link-button';
import {ImageButton} from '../../../text-editor/menubar/image-button';
import {ClearFormatButton} from '../../../text-editor/menubar/clear-format-button';
import {InsertMenuTrigger} from '../../../text-editor/menubar/insert-menu-trigger';
import {FormatMenuTrigger} from '../../../text-editor/menubar/format-menu-trigger';
import {ColorButtons} from '../../../text-editor/menubar/color-buttons';
import {AlignButtons} from '../../../text-editor/menubar/align-buttons';
import {IndentButtons} from '../../../text-editor/menubar/indent-buttons';
import {CodeBlockMenuTrigger} from '../../../text-editor/menubar/code-block-menu-trigger';
import {MenubarButtonProps} from '../../../text-editor/menubar/menubar-button-props';
import {useIsMobileMediaQuery} from '../../../utils/hooks/is-mobile-media-query';
import {IconButton} from '../../../ui/buttons/icon-button';
import {UnfoldMoreIcon} from '../../../icons/material/UnfoldMore';
import {UnfoldLessIcon} from '../../../icons/material/UnfoldLess';

const rowClassName =
  'flex items-center justify-center px-4 h-42 text-muted border-b rounded overflow-hidden';

export function MenuBar({editor, size = 'md'}: MenubarButtonProps) {
  const isMobile = useIsMobileMediaQuery();
  const [extendedVisible, setExtendedVisible] = useState(false);
  return (
    <div className={clsx(extendedVisible ? 'h-84' : 'h-42')}>
      <div className={clsx(rowClassName, 'relative z-20')}>
        <FormatMenuTrigger editor={editor} size={size} />
        <Divider />
        <FontStyleButtons editor={editor} size={size} />
        <Divider />
        <AlignButtons editor={editor} size={size} />
        <IndentButtons editor={editor} size={size} />
        <Divider />
        {isMobile ? (
          <IconButton
            className="flex-shrink-0"
            color={extendedVisible ? 'primary' : null}
            size={size}
            radius="rounded"
            onClick={() => {
              setExtendedVisible(!extendedVisible);
            }}
          >
            {extendedVisible ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
          </IconButton>
        ) : (
          <ExtendedButtons editor={editor} size={size} />
        )}
      </div>
      <AnimatePresence>
        {extendedVisible && (
          <m.div
            className={clsx(rowClassName, 'absolute w-full h-full flex')}
            initial={{y: '-100%'}}
            animate={{y: 0}}
            exit={{y: '-100%'}}
          >
            <ExtendedButtons editor={editor} size={size} />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ExtendedButtons({editor, size = 'md'}: MenubarButtonProps) {
  return (
    <>
      <ListButtons editor={editor} size={size} />
      <Divider />
      <LinkButton editor={editor} size={size} />
      <ImageButton editor={editor} size={size} />
      <InsertMenuTrigger editor={editor} size={size} />
      <Divider />
      <ColorButtons editor={editor} size={size} />
      <Divider />
      <CodeBlockMenuTrigger editor={editor} size={size} />
      <ClearFormatButton editor={editor} size={size} />
    </>
  );
}
