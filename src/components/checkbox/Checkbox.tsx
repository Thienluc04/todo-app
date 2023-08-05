import { StatusTodo } from '@/models/todo';

export interface CheckboxProps {
  status: StatusTodo;
  onChange: () => void;
}

export function Checkbox({ status, onChange }: CheckboxProps) {
  return (
    <label className="cursor-pointer">
      <input type="checkbox" name="" id="" className="hidden" onChange={onChange} />
      <span
        className={`flex items-center justify-center h-10 w-10 text-white rounded-lg ${
          status === 'Complete' ? 'bg-blue-500' : 'bg-gray-300 text-transparent'
        }`}
      >
        {status === 'Complete' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    </label>
  );
}
