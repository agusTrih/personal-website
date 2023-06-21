import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import cn from '~/utils/classNames';
import type { VariantProps } from 'class-variance-authority';
import { decodeHtmlEntities } from '~/utils/decode';

const paragraphVariants = cva('font-sans text-text-body font-normal mb-3', {
  variants: {
    variant: {
      default: '',
      bubble:
        'bg-blue-500 py-1 px-2 text-white text-sm inline-block rounded-3xl font-bold relative leading-tight',
    },
    size: {
      sm: 'text-xs leading-6',
      md: 'text-sm leading-6 ',
      lg: 'text-base leading-8',
    },
  },
});

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  children?: React.ReactNode;
  isDangerous?: boolean;
  text?: string;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    {
      size = 'md',
      variant = 'default',
      children,
      text = '',
      isDangerous = false,
      className,
      ...props
    },
    ref
  ) => {
    // if html input
    if (isDangerous)
      return (
        <div
          className={cn(
            paragraphVariants({
              size,
              variant,
              className,
            })
          )}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      );

    return (
      <p
        ref={ref}
        className={cn(
          paragraphVariants({
            size,
            variant,
            className,
          })
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
