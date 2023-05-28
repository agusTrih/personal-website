import { cva } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import cn from '~/utils/classNames';
import type { VariantProps } from 'class-variance-authority';
import { decodeHtmlEntities } from '~/utils/decode';
import { formatTime } from '~/utils/date';

const timeVariants = cva('font-sans text-text-time font-normal', {
  variants: {
    size: {
      sm: 'text-xs leading-4',
    },
  },
});

interface TimeProps
  extends React.HTMLAttributes<HTMLTimeElement>,
    VariantProps<typeof timeVariants> {
  date?: string;
  type?: 'timeAgo' | 'fullDate' | 'mix' | 'date';
}

const Time = forwardRef<HTMLTimeElement, TimeProps>(
  ({ size = 'sm', date = '', type = 'date', className, ...props }, ref) => {
    // if html input

    return (
      <time
        ref={ref}
        className={cn(
          timeVariants({
            size,
            className,
          })
        )}
        {...props}
      >
        {formatTime(date, type)}
      </time>
    );
  }
);

Time.displayName = 'Time';
export default Time;
