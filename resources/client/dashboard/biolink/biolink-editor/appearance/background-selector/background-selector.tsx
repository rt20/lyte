import clsx from 'clsx';
import {Trans} from '@common/i18n/trans';
import {ImageIcon} from '@common/icons/material/Image';
import {FormatColorFillIcon} from '@common/icons/material/FormatColorFill';
import {GradientIcon} from '@common/icons/material/Gradient';
import {ReactElement, ReactNode, useState} from 'react';
import {ColorBackgroundTab} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/color-background-tab';
import {GradientBackgroundTab} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/gradient-background-tab';
import {ImageBackgroundTab} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-background-tab/image-background-tab';
import {SelectedBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/selected-background';
import {
  biolinkEditorState,
  useBiolinkEditorStore,
} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {appearanceHeaderClassnames} from '@app/dashboard/biolink/biolink-editor/appearance/header-classnames';

export interface BgSelectorTabProps<T extends SelectedBackground> {
  value?: T;
  onChange?: (value: T | null) => void;
  className?: string;
}

const TabMap: Record<
  'color' | 'gradient' | 'image',
  (value: BgSelectorTabProps<any>) => ReactElement
> = {
  color: ColorBackgroundTab,
  gradient: GradientBackgroundTab,
  image: ImageBackgroundTab,
};
type TabName = keyof typeof TabMap;

interface BackgroundSelectorProps {
  className?: string;
}
export function BackgroundSelector({className}: BackgroundSelectorProps) {
  const value = useBiolinkEditorStore(s => s.appearance?.bgConfig);

  const [activeTab, setActiveTab] = useState<TabName>(() => {
    if (value?.type === 'color') return 'color';
    if (value?.type === 'gradient') return 'gradient';
    return 'color';
  });

  const Tab = TabMap[activeTab];

  return (
    <div className={className}>
      <h2 className={appearanceHeaderClassnames.h2}>
        <Trans message="Background" />
      </h2>
      <TypeSelector activeTab={activeTab} onTabChange={setActiveTab} />
      <Tab
        value={activeTab === value?.type ? value : undefined}
        onChange={newValue => {
          biolinkEditorState().updateAppearance({bgConfig: newValue});
        }}
        className="grid gap-14 grid-cols-[repeat(auto-fill,minmax(90px,1fr))] items-start"
      />
    </div>
  );
}

interface TypeSelectorProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}
function TypeSelector({activeTab, onTabChange}: TypeSelectorProps) {
  return (
    <div className="my-20 pb-20 flex items-center gap-20 border-b">
      <TypeButton
        isActive={activeTab === 'color'}
        icon={<FormatColorFillIcon />}
        title={<Trans message="Flat color" />}
        onClick={() => {
          onTabChange('color');
        }}
      />
      <TypeButton
        isActive={activeTab === 'gradient'}
        icon={<GradientIcon />}
        title={<Trans message="Gradient" />}
        onClick={() => {
          onTabChange('gradient');
        }}
      />
      <TypeButton
        isActive={activeTab === 'image'}
        icon={<ImageIcon />}
        title={<Trans message="Image" />}
        onClick={() => {
          onTabChange('image');
        }}
      />
    </div>
  );
}

interface TypeButtonProps {
  isActive: boolean;
  icon: ReactNode;
  title: ReactNode;
  onClick?: () => void;
}
function TypeButton({isActive, icon, title, onClick}: TypeButtonProps) {
  return (
    <div role="button" className="block" onClick={onClick}>
      <div
        className={clsx(
          'w-50 h-50 mx-auto border rounded flex items-center justify-center text-muted mb-8',
          isActive && 'ring border-primary'
        )}
      >
        {icon}
      </div>
      <div className="text-sm text-center text-primary">{title}</div>
    </div>
  );
}
