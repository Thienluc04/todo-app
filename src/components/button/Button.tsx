import { PropsWithChildren } from 'react';

export interface ButtonProps {
  onClick: () => void;
  className?: string;
}

export function Button({ onClick, children, className = '' }: PropsWithChildren<ButtonProps>) {
  return (
    <button className={`px-5 py-3  rounded-lg ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
