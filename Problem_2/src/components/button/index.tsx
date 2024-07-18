import React, { ComponentPropsWithoutRef } from 'react';

interface IProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string
}

const Button = ({
  onClick,
  children,
  className,
  ...rest
}: IProps & ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      {...rest}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
