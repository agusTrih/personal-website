import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import cn from '~/utils/classNames';
import type { VariantProps } from 'class-variance-authority';
import { decodeHtmlEntities } from '~/utils/decode';

const paragraphVariants = cva('font-sans text-text-body font-normal', {
  variants: {
    size: {
      sm: 'text-xs leading-6',
      md: 'text-xs leading-[18.75px] ',
      lg: 'text-base leading-8',
    },
  },
});

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
  text?: string;
  isDangerous?: boolean;
}

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (
    { size = 'sm', text = '', isDangerous = false, className, ...props },
    ref
  ) => {
    // if html input
    if (isDangerous)
      return (
        <div
          className={cn(
            paragraphVariants({
              size,
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
            className,
          })
        )}
        {...props}
      >
        {decodeHtmlEntities(text)}
      </p>
    );
  }
);

Paragraph.displayName = 'Paragraph';
export default Paragraph;
