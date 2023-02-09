import {Biolink} from '@app/dashboard/biolink/biolink';
import {BiolinkLayout} from '@app/short-links/renderers/biolink-renderer/biolink-layout';

interface BiolinkRendererProps {
  biolink: Biolink;
}
export function BiolinkRenderer({biolink}: BiolinkRendererProps) {
  return (
    <BiolinkLayout
      biolink={biolink}
      enableLinkAnimations
      showAds
      className="max-w-680 mx-auto"
    />
  );
}
