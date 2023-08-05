import { StatusTodo } from '@/models/todo';
import { PropsWithChildren } from 'react';

export interface OptionProps {
  value: StatusTodo | 'All';
}

export function Option({ value, children }: PropsWithChildren<OptionProps>) {
  return <option value={value}>{children}</option>;
}
