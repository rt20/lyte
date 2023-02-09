import {useForm} from 'react-hook-form';
import {useCreateLinkOverlay} from '@app/dashboard/link-overlays/requests/use-create-link-overlay';
import {CrupdateLinkOverlayForm} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-form';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {useNavigate} from '@common/utils/hooks/use-navigate';
import {CrupdateLinkOverlayPayload} from '@app/dashboard/link-overlays/crupdate/crupdate-link-overlay-payload';

export function CreateLinkOverlayPage() {
  const {trans} = useTrans();
  const navigate = useNavigate();
  const form = useForm<CrupdateLinkOverlayPayload>({
    defaultValues: {
      position: 'bottom-left',
      theme: 'default',
      label: trans(message('Label')),
      message: trans(message('Your message here')),
      btn_text: trans(message('Button text')),
      btn_link: 'https://google.com',
      colors: {
        'bg-color': 'rgb(61, 75, 101)',
        'text-color': 'rgb(255, 255, 255)',
        'label-bg-color': 'rgb(255, 255, 255)',
        'label-color': 'rgb(0, 0, 0)',
      },
    },
  });
  const createOverlay = useCreateLinkOverlay(form);
  return (
    <CrupdateLinkOverlayForm
      form={form}
      isLoading={createOverlay.isLoading}
      onSubmit={values => {
        createOverlay.mutate(values, {
          onSuccess: () => navigate('..', {relative: 'path'}),
        });
      }}
    />
  );
}
