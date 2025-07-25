import * as Popover from '@radix-ui/react-popover';
import { HexColorInput, HexColorPicker } from 'react-colorful';

const PopoverColorPicker = ({
  color,
  onChange,
}: {
  color: string;
  onChange: (color: string) => void;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <div
          className='w-8 h-8 rounded-full cursor-pointer shadow-soft'
          style={{ backgroundColor: color }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side='bottom'
          align='start'
          sideOffset={8}
          className='shadow-2xl bg-background-white rounded-md z-50 w-[220px]'
        >
          <div className='w-full'>
            <HexColorPicker
              color={color}
              onChange={onChange}
              style={{ width: '100%' }}
            />
          </div>
          <div className='py-2 px-4 flex items-center gap-2 w-full text-sm'>
            <span className='text-text- text-sm'>#</span>
            <HexColorInput
              color={color}
              onChange={onChange}
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                minWidth: 0,
              }}
              className='flex-1'
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default PopoverColorPicker;
