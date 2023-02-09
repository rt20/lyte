import {FormTextField} from '@common/ui/forms/input-field/text-field/text-field';
import {Trans} from '@common/i18n/trans';
import {FileUploadProvider} from '@common/uploads/uploader/file-upload-provider';
import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {FormImageSelector} from '@common/ui/images/image-selector';

interface LinkSeoFieldsProps {
  hideTitle?: boolean;
}
export function LinkSeoFields({hideTitle}: LinkSeoFieldsProps) {
  return (
    <div>
      <div className="block md:flex gap-24 mb-24">
        <FileUploadProvider>
          <FormImageSelector
            name="image"
            diskPrefix="links"
            variant="avatar"
            previewSize="w-90 h-90"
            previewRadius="rounded"
            placeholderIcon={<div className="w-full h-full bg-alt rounded" />}
            showRemoveButton
          />
        </FileUploadProvider>
        <div className="flex-auto my-24 md:my-0">
          {!hideTitle && (
            <FormTextField
              name="name"
              label={<Trans message="Title" />}
              className="mb-24"
            />
          )}
          <FormTextField
            inputElementType="textarea"
            name="description"
            rows={2}
            label={<Trans message="description" />}
          />
        </div>
      </div>
      <FormChipField
        name="tags"
        label={<Trans message="Tags" />}
        valueKey="name"
      />
    </div>
  );
}
