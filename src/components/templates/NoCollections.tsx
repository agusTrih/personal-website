import { FC } from 'react';
import { Button, buttonVariants } from '../atoms/Button/Button';
import Link from 'next/link';
import cn from '~/utils/classNames';

interface NoCollectionsProps {}

const NoCollections: FC<NoCollectionsProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">No Collections</h1>
      <Link
        href="/repo"
        className={cn(
          'text-white',
          buttonVariants({ variant: 'primary', size: 'sm' })
        )}
      >
        Go To Search Repo{' '}
      </Link>
    </div>
  );
};

export default NoCollections;
