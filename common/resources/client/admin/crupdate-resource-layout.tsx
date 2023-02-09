import {FieldValues, SubmitHandler, UseFormReturn} from 'react-hook-form';
import clsx from 'clsx';
import {ReactNode} from 'react';
import {useStickySentinel} from '../utils/hooks/sticky-sentinel';
import {Form} from '../ui/forms/form';
import {Button} from '../ui/buttons/button';
import {Trans} from '../i18n/trans';

interface Props<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  form: UseFormReturn<T>;
  title: ReactNode;
  isLoading: boolean;
  children: ReactNode;
}
export function CrupdateResourceLayout<T extends FieldValues>({
  onSubmit,
  form,
  title,
  children,
  isLoading = false,
}: Props<T>) {
  const {isSticky, sentinelRef} = useStickySentinel();

  return (
    <Form
      onSubmit={onSubmit}
      onBeforeSubmit={() => {
        form.clearErrors();
      }}
      form={form}
    >
      <div ref={sentinelRef} />
      <div
        className={clsx(
          'sticky top-0 my-12 md:my-24 z-10 transition-shadow',
          isSticky && 'bg-paper shadow'
        )}
      >
        <div className="container mx-auto flex items-center md:items-start gap-24 py-14 px-24">
          <h1 className="text-xl md:text-3xl">{title}</h1>
          <Button
            className="ml-auto"
            variant="flat"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            <Trans message="Save" />
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-24 pb-24">
        <div className="rounded">{children}</div>
      </div>
    </Form>
  );
}
