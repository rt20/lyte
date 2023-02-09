import {useForm} from 'react-hook-form';
import {CrupdateLinkOverlayForm} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-form';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';
import {useParams} from 'react-router-dom';
import {useLinkOverlay} from '@app/dashboard/link-overlays/requests/use-link-overlay';
import {FullPageLoader} from '@common/ui/progress/full-page-loader';
import {LinkOverlay} from '@app/dashboard/link-overlays/link-overlay';
import {useUpdateLinkOverlay} from '@app/dashboard/link-overlays/requests/use-update-link-overlay';

export function UpdateLinkOverlayPage() {
  const {overlayId} = useParams();
  const {data, isLoading, isError} = useLinkOverlay(overlayId!);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (isError) {
    return null;
  }

  return <PageContent overlay={data.linkOverlay} />;
}

interface PageContentProps {
  overlay: LinkOverlay;
}
function PageContent({overlay}: PageContentProps) {
  const navigate = useNavigate();
  const form = useForm<CrupdateLinkOverlayPayload>({
    defaultValues: {
      name: overlay.name,
      position: overlay.position,
      theme: overlay.theme,
      label: overlay.label,
      message: overlay.message,
      btn_text: overlay.btn_text,
      btn_link: overlay.btn_link,
      colors: overlay.colors,
    },
  });
  const updateOverlay = useUpdateLinkOverlay(overlay.id, form);
  return (
    <CrupdateLinkOverlayForm
      form={form}
      isLoading={updateOverlay.isLoading}
      onSubmit={values => {
        updateOverlay.mutate(values, {
          onSuccess: () => navigate('../..', {relative: 'path'}),
        });
      }}
    />
  );
}
