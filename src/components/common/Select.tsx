import { PropsWithChildren } from 'react';

export interface SelectProps {
  name: string;
  value?: string | number;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className: string;
}

export function Select({
  name,
  value,
  onChange,
  className = '',
  children,
}: PropsWithChildren<SelectProps>) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`h-10 p-2 rounded-lg cursor-pointer ${className}`}
    >
      {children}
    </select>
  );
}
