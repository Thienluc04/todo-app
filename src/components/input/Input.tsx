import { HTMLInputTypeAttribute, LegacyRef, forwardRef } from 'react';

export interface InputProps {
  type: HTMLInputTypeAttribute;
  ref: LegacyRef<HTMLInputElement>;
  defaultValue: string;
  className?: string;
}

export const Input = forwardRef(
  ({ type, defaultValue, className = '' }: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    return (
      <>
        <input
          type={type}
          ref={ref}
          defaultValue={defaultValue}
          className={`h-10 p-2 bg-white border border-gray-500 rounded-lg dark:bg-slate-200 ${className}`}
        />
      </>
    );
  },
);
