import secureFilesSvg from '@common/auth/ui/account-settings/access-token-panel/secure-files.svg';
import {useTrans} from '@common/i18n/use-trans';
import {Button} from '@common/ui/buttons/button';
import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {SvgImage} from '@common/ui/images/svg-image/svg-image';
import {Trans} from '@common/i18n/trans';
import {
  CheckLinkPasswordPayload,
  useCheckLinkPassword,
} from '@app/short-links/requests/use-check-link-password';
import {Link} from '@app/dashboard/links/link';
import {LinkGroup} from '@app/dashboard/link-groups/link-group';
import {Biolink} from '@app/dashboard/biolink/biolink';
import {useForm} from 'react-hook-form';
import {Form} from '@common/ui/forms/form';

interface PasswordPageProps {
  linkeable: Link | LinkGroup | Biolink;
  onPasswordValid: () => void;
}
export function PasswordPage({linkeable, onPasswordValid}: PasswordPageProps) {
  const {trans} = useTrans();
  const fieldLabel = trans({message: 'Password'});
  const form = useForm<CheckLinkPasswordPayload>();
  const checkPassword = useCheckLinkPassword(linkeable, form);

  return (
    <div className="bg-alt w-full h-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-40 md:gap-14 bg items-center max-w-[560px] border rounded p-24 m-14">
        <div className="h-132">
          <SvgImage src={secureFilesSvg} />
        </div>
        <Form
          form={form}
          onSubmit={values => {
            checkPassword.mutate(values, {onSuccess: onPasswordValid});
          }}
        >
          <span className="text-sm">
            <Trans message="The link you are trying to access is password protected." />
          </span>
          <FormTextField
            name="password"
            autoFocus
            placeholder={fieldLabel}
            aria-label={fieldLabel}
            className="mt-10 mb-20"
            type="password"
            required
          />
          <div className="text-right">
            <Button
              variant="flat"
              color="primary"
              type="submit"
              className="w-full md:w-auto"
              disabled={checkPassword.isLoading}
            >
              <Trans message="Enter" />
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
