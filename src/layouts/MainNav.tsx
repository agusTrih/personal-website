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
      link: '/blog',
    },
    {
      title: 'Project',
      link: '/project',
    },
    {
      title: 'Technology',
      link: '/tech',
    },
    {
      title: 'Kontak',
      link: '/kontak',
    },
  ];
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {nav?.map((item) => {
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
