import {useDialogContext} from '@common/ui/overlays/dialog/dialog-context';
import {Dialog} from '@common/ui/overlays/dialog/dialog';
import {DialogHeader} from '@common/ui/overlays/dialog/dialog-header';
import {Trans} from '@common/i18n/trans';
import {DialogBody} from '@common/ui/overlays/dialog/dialog-body';
import {DialogFooter} from '@common/ui/overlays/dialog/dialog-footer';
import {Button} from '@common/ui/buttons/button';
import {useForm, useFormContext} from 'react-hook-form';
import {BiolinkLink} from '@app/dashboard/biolink/biolink';
import {Form} from '@common/ui/forms/form';
import {toast} from '@common/ui/toast/toast';
import {message} from '@common/i18n/message';
import {LinkAnimationList} from '@app/dashboard/biolink/biolink-editor/content/link-content-item/link-animation-list';
import {useEffect, useState} from 'react';
import clsx from 'clsx';
import {SectionHelper} from '@common/ui/section-helper';
import {BiolinkItemPayload} from '@app/dashboard/biolink/biolink-editor/content/biolink-item-payload';
import {useUpdateBiolinkContentItem} from '@app/dashboard/biolink/biolink-editor/requests/use-update-biolink-content-item';

interface LinkAnimationDialogProps {
  link: BiolinkLink;
}
export function LinkAnimationDialog({link}: LinkAnimationDialogProps) {
  const {close, formId} = useDialogContext();
  const form = useForm<BiolinkItemPayload>({
    defaultValues: {
      animation: link.animation,
    },
  });
  const isDirty = form.formState.isDirty;
  const updateItem = useUpdateBiolinkContentItem();

  useEffect(() => {
    import('./animate.min.css');
  }, []);

  return (
    <Dialog size="md">
      <DialogHeader>
        <Trans message="Link animation" />
      </DialogHeader>
      <DialogBody>
        <Form
          id={formId}
          form={form}
          onSubmit={async values => {
            updateItem.mutate(
              {
                item: link,
                values,
              },
              {
                onSuccess: () => {
                  toast.positive(message('Animation updated'));
                  close();
                },
              }
            );
          }}
        >
          <SectionHelper
            className="mb-24"
            description={
              <Trans
                message="Add animation to draw attention to this link. :br Selected animation will repeat five times by default."
                values={{br: <br />}}
              />
            }
          />
          <div className="grid gap-14 grid-cols-[repeat(auto-fill,minmax(95px,1fr))]">
            {LinkAnimationList.map((animation, index) => (
              <AnimationItem key={index} animationName={animation} />
            ))}
          </div>
        </Form>
      </DialogBody>
      <DialogFooter dividerTop>
        <Button
          variant="text"
          onClick={() => {
            close();
          }}
        >
          <Trans message="Cancel" />
        </Button>
        <Button
          variant="flat"
          color="primary"
          type="submit"
          form={formId}
          disabled={updateItem.isLoading || !isDirty}
        >
          <Trans message="Save" />
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

interface AnimationItemProps {
  animationName: string;
}
function AnimationItem({animationName}: AnimationItemProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const {watch, setValue} = useFormContext<BiolinkItemPayload>();
  const animation: string | null =
    animationName === 'none' ? null : animationName;
  const selectedAnimation = watch('animation');

  return (
    <button
      type="button"
      onClick={() => {
        setValue('animation', animation, {shouldDirty: true});
      }}
      onPointerEnter={() => {
        setIsAnimating(true);
      }}
      onPointerLeave={() => {
        setIsAnimating(false);
      }}
      className={clsx(
        'border border-2 px-10 h-64 uppercase font-medium rounded flex items-center justify-center animate__animated',
        isAnimating && `animate__${animationName}`,
        selectedAnimation === animation && 'border-primary'
      )}
    >
      {animationName}
    </button>
  );
}
