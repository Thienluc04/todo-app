import { PropsWithChildren } from 'react';

export interface TodoListProps {
  className?: string;
}

export function TodoList({ className, children }: PropsWithChildren<TodoListProps>) {
  return (
    <div
      className={`flex flex-col gap-5 p-5 bg-gray-200 rounded-xl dark:bg-slate-600 ${className}`}
    >
      {children}
    </div>
  );
}
