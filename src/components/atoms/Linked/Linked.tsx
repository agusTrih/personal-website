import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React, { forwardRef } from 'react';
import cn from '~/utils/classNames';

const linkedVariants = cva('font-sans', {
  variants: {
    variant: {
      default: '',
      background:
        'flex items-center justify-center rounded-[32px] text-center  px-5 py-2 mr-2 mb-2',
      footer: '',
    },
    radius: {
      xs: '',
      sm: '',
      md: 'rounded-2xl',
      lg: 'rounded-[32px]',
    },
    bg: {
      default: '',
      grey: 'bg-[#F2F2F2]',
      primary: 'bg-primary',
      secondary: 'bg-secondary',
    },
    colors: {
      default: '',
      black: 'text-black',
      white: 'text-white',
      grey: 'text-text-body',
    },
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
    },
  },
});

interface LinkedProps
  extends React.HTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkedVariants> {
  isExternal?: boolean;
  href: string;
}

const Linked = forwardRef<HTMLAnchorElement, LinkedProps>(
  (
    {
      isExternal = false,
      href,
      bg = 'grey',
      radius = 'lg',
      variant = 'background',
      sizes = 'sm',
      colors,
      className,
      children,
      ...props
    },
    ref
  ) => {
    if (isExternal)
      return (
        <a
          ref={ref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            linkedVariants({
              variant,
              bg,
              radius,
              sizes,
              colors,
              className,
            })
          )}
          href={href}
          {...props}
        >
          {children}
        </a>
      );

    return (
      <Link
        ref={ref}
        className={cn(
          linkedVariants({
            variant,
            bg,
            sizes,
            radius,
            colors,
            className,
          })
        )}
        href={href}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

Linked.displayName = 'Linked';

export default Linked;
