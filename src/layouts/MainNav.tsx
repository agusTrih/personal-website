import { HighlightOnHover } from '@/components/atoms/HIghlightOnHover';
import Link from 'next/link';
import cn from '~/utils/classNames';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const nav = [
    {
      title: 'Blog',
      link: 'https://medium.com/@agustrihanton',
      isExternal: true,
      isTarget: true,
    },
    {
      title: 'Collections',
      link: '/collections',
      isExternal: false,
    },
    {
      title: 'Kontak',
      link: 'mailto:agustrihanton97@gmail.com?subject=CodeWithAgus',
      isTarget: false,
      isExternal: true,
    },
  ];
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {nav?.map((item) => {
        if (item.isExternal)
          return (
            <a
              key={item.link}
              className="text-sm font-medium transition-colors hover:text-primary"
              href={item.link}
              target={item?.isTarget ? '_blank' : ''}
              rel="noopener noreferrer"
            >
              {' '}
              <HighlightOnHover>{item.title}</HighlightOnHover>
            </a>
          );
        return (
          <Link
            key={item.link}
            href={item.link}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            <HighlightOnHover>{item.title}</HighlightOnHover>
          </Link>
        );
      })}
    </nav>
  );
}
