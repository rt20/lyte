import {TextField} from '@common/ui/forms/input-field/text-field/text-field';
import {LandingPageContent} from '@app/landing/landing-page-content';
import {Button} from '@common/ui/buttons/button';
import {useTrans} from '@common/i18n/use-trans';
import {useMutation} from '@tanstack/react-query';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {apiClient} from '@common/http/query-client';
import {showHttpErrorToast} from '@common/utils/http/show-http-error-toast';
import {BackendResponse} from '@common/http/backend-response/backend-response';
import {useRef, useState} from 'react';
import {urlIsValid} from '@app/dashboard/links/utils/url-is-valid';
import {Link} from '@app/dashboard/links/link';
import {Trans} from '@common/i18n/trans';
import {flushSync} from 'react-dom';
import useClipboard from 'react-use-clipboard';
import {useSettings} from '@common/core/settings/use-settings';
import {useRecaptcha} from '@common/recaptcha/use-recaptcha';

interface LandingPageNewLinkFormProps {
  content: LandingPageContent;
}
export function LandingPageNewLinkForm({content}: LandingPageNewLinkFormProps) {
  const {trans} = useTrans();
  const {verify, isVerifying} = useRecaptcha('link_creation');
  const {
    links: {default_type},
  } = useSettings();
  const inputRef = useRef<HTMLInputElement>(null);
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [, copyToClipboard] = useClipboard(shortUrl, {
    successDuration: 100,
  });

  const createPayload: Partial<Link> = {
    long_url: longUrl,
    type: default_type || 'direct',
  };

  const createLink = useMutation(() => postCreateLink(createPayload), {
    onSuccess: response => {
      toast.positive(trans(message('Link shortened')));
      flushSync(() => {
        setShortUrl(response.link.short_url);
      });
      inputRef.current?.select();
    },
    onError: err =>
      showHttpErrorToast(
        err,
        message('Could not shorten link. Please try again later'),
        'long_url'
      ),
  });

  return (
    <form
      className="w-full mt-60 md:mt-80"
      onSubmit={async e => {
        e.preventDefault();

        if (createLink.isLoading || isVerifying) return;

        // Input is in "copy" mode, copy shortened link to clipboard on submit
        if (shortUrl) {
          flushSync(() => {
            copyToClipboard();
            setShortUrl('');
            setLongUrl('');
          });
          toast.positive(message('Copied link to clipboard'));
          return;
        }

        // input is in "shorten" mode, shorten link on submit
        if (!urlIsValid(longUrl)) {
          toast.danger(message('This url is invalid.'));
        } else {
          const isValid = await verify();
          if (isValid) {
            createLink.mutate();
          }
        }
      }}
    >
      <TextField
        inputRef={inputRef}
        background="bg-white"
        inputRadius="rounded-full"
        size="lg"
        inputClassName="bg-white"
        placeholder={content.actions.inputText}
        value={shortUrl || longUrl}
        onChange={e => {
          setLongUrl(e.target.value);
        }}
        endAppend={
          <Button
            radius="rounded-r-full"
            type="submit"
            variant="flat"
            color="primary"
            className="min-w-160"
          >
            {shortUrl ? <Trans message="Copy" /> : content.actions.inputButton}
          </Button>
        }
      />
    </form>
  );
}

interface CreateLinkResponse extends BackendResponse {
  link: Link;
}
function postCreateLink(values: Partial<Link>): Promise<CreateLinkResponse> {
  return apiClient.post(`link`, values).then(r => r.data);
}
