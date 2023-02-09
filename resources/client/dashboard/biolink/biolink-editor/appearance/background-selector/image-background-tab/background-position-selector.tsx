import {BgSelectorTabProps} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/background-selector';
import {ImageBackground} from '@app/dashboard/biolink/biolink-editor/appearance/background-selector/image-backgrounds';
import {RadioGroup} from '@common/ui/forms/radio-group/radio-group';
import {Radio} from '@common/ui/forms/radio-group/radio';
import {Trans} from '@common/i18n/trans';
import {MessageDescriptor} from '@common/i18n/message-descriptor';
import {message} from '@common/i18n/message';

const BackgroundPositions: Record<
  'cover' | 'contain' | 'repeat',
  {
    label: MessageDescriptor;
    bgConfig: Partial<ImageBackground>;
  }
> = {
  cover: {
    label: message('Stretch to fit'),
    bgConfig: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  },
  contain: {
    label: message('Fit image'),
    bgConfig: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
    },
  },
  repeat: {
    label: message('Repeat image'),
    bgConfig: {
      backgroundRepeat: 'repeat',
      backgroundSize: undefined,
      backgroundPosition: 'left top',
    },
  },
};

export function BackgroundPositionSelector({
  value: imageBgValue,
  onChange,
}: Omit<BgSelectorTabProps<ImageBackground>, 'className'>) {
  const selectedPosition = positionKeyFromValue(imageBgValue);
  return (
    <div className="border-t mt-20 pt-14">
      <RadioGroup size="sm" disabled={!imageBgValue}>
        {Object.entries(BackgroundPositions).map(([key, position]) => {
          return (
            <Radio
              key={key}
              name="background-position"
              value={key}
              checked={key === selectedPosition}
              onChange={e => {
                if (imageBgValue) {
                  onChange?.({
                    ...imageBgValue,
                    ...position.bgConfig,
                  });
                }
              }}
            >
              <Trans {...position.label} />
            </Radio>
          );
        })}
      </RadioGroup>
    </div>
  );
}

function positionKeyFromValue(
  value?: ImageBackground
): keyof typeof BackgroundPositions {
  if (value?.backgroundSize === 'cover') {
    return 'cover';
  } else if (value?.backgroundSize === 'contain') {
    return 'contain';
  } else {
    return 'repeat';
  }
}
