import {Link} from '@app/dashboard/links/link';
import {useSettings} from '@common/core/settings/use-settings';
import {useCallback, useEffect, useRef, useState} from 'react';
import {buildLongUrlWithUtm} from '@app/dashboard/links/utils/build-long-url-with-utm';
import {Trans} from '@common/i18n/trans';
import {Button, ButtonProps} from '@common/ui/buttons/button';

interface RedirectCountdownButtonProps extends ButtonProps {
  link: Link;
}
export function RedirectCountdownButton({
  link,
  ...buttonProps
}: RedirectCountdownButtonProps) {
  const {
    links: {redirect_time = 0}, // in seconds
  } = useSettings();

  const intervalRef = useRef<NodeJS.Timer | null>(null);
  const countDownRef = useRef(redirect_time);
  const [countdown, setCountdown] = useState(countDownRef.current);

  const redirectToLongUrl = useCallback(() => {
    window.location.href = buildLongUrlWithUtm(link);
  }, [link]);

  useEffect(() => {
    if (!redirect_time) {
      return;
    }

    intervalRef.current = setInterval(() => {
      countDownRef.current--;
      if (countDownRef.current <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        redirectToLongUrl();
      }
      setCountdown(countDownRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [redirect_time, setCountdown, redirectToLongUrl]);

  const buttonText =
    countdown > 0 ? (
      <Trans message="Redirect in :seconds" values={{seconds: countdown}} />
    ) : (
      <Trans message="Go to link" />
    );

  return (
    <Button
      {...buttonProps}
      className="min-w-128"
      onClick={() => {
        if (countdown <= 0) {
          redirectToLongUrl();
        }
      }}
    >
      {buttonText}
    </Button>
  );
}
