import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import cn from '~/utils/classNames';
import type { VariantProps } from 'class-variance-authority';

const headingVariants = cva('font-bold font-sans', {
  variants: {
    sizes: {
      xs: 'text-xs',
      sm: 'text-[18px] leading-[21.09px]',
      md: 'text-md leading-[28px]',
      lg: 'text-lg',
      xl: 'text-xl',
      xxl: 'md:text-3xl text-xl',
    },
    as: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: '',
    },

    colors: {
      black: 'text-text-title',
      white: 'text-white',
    },
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  children: React.ReactNode;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as = 'h6', sizes = 'xs', colors, children, className, ...props }, ref) => {
    const Tag = as || 'h6';

    return (
      <Tag
        ref={ref}
        className={cn(
          headingVariants({
            colors,
            className,
            sizes,
          })
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

Heading.displayName = 'Heading';
export default Heading;
