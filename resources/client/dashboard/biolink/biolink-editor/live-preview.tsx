import {ReactNode} from 'react';
import {BiolinkLayout} from '@app/short-links/renderers/biolink-renderer/biolink-layout';
import {Trans} from '@common/i18n/trans';
import {Chip} from '@common/ui/forms/input-field/chip-field/chip';
import {useBiolinkEditorStore} from '@app/dashboard/biolink/biolink-editor/biolink-editor-store';
import {useIsTabletMediaQuery} from '@common/utils/hooks/is-tablet-media-query';
import {useEditorBiolink} from '@app/dashboard/biolink/biolink-editor/requests/use-editor-biolink';

export function LivePreview() {
  const {biolink} = useEditorBiolink();
  const appearance = useBiolinkEditorStore(s => s.appearance);
  const isTablet = useIsTabletMediaQuery();

  if (isTablet) {
    return null;
  }

  return (
    <div className="flex-shrink-0 sticky top-24 h-max">
      <Chip
        size="sm"
        color="positive"
        radius="rounded"
        className="w-max m-auto mb-24"
      >
        <Trans message="Live preview" />
      </Chip>
      <PhoneSkeleton>
        {biolink ? (
          <BiolinkLayout biolink={biolink} appearance={appearance} />
        ) : null}
      </PhoneSkeleton>
      <div className="text-sm text-muted text-center mt-14">
        <Trans message="Scheduled and disabled content is not shown" />
      </div>
    </div>
  );
}

interface PhoneSkeletonProps {
  children: ReactNode;
}
function PhoneSkeleton({children}: PhoneSkeletonProps) {
  return (
    <div className="w-350 h-[724px] rounded-[64px] shadow-lg border border-[#444546] border-[12px] overflow-hidden">
      <div className="overflow-y-auto h-full compact-scrollbar">{children}</div>
    </div>
  );
}
