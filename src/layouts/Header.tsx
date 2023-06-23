import { FC } from 'react';
import { MainNav } from './MainNav';
import { Highlight } from '@/components/atoms/Highlight';
import { pallete } from 'src/constant';
import Link from 'next/link';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between py-5 mb-5 border-b border-gray-300">
        <Link href={'/'}>
          <Highlight type="underline" color={pallete.primary}>
            Agus.
          </Highlight>
        </Link>
        <MainNav />
      </div>
    </header>
  );
};

export default Header;
