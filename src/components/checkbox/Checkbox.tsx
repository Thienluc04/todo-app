import { StatusTodo } from '@/models/todo';
import clsx from 'clsx';
import { IconTick } from '@/components/icons';

export interface CheckboxProps {
  status: StatusTodo;
  onChange: () => void;
}

export function Checkbox({ status, onChange }: CheckboxProps) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" name="" id="" className="hidden" onChange={onChange} />
      <span
        className={`flex items-center justify-center h-10 w-10 text-white rounded-lg
        ${clsx(
          status === 'Complete' && 'bg-blue-500',
          status === 'Incomplete' && 'bg-gray-300 text-transparent',
        )}
         `}
      >
        {status === 'Complete' && <IconTick></IconTick>}
      </span>
    </label>
  );
}
