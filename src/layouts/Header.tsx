import { FC } from 'react';
import { MainNav } from './MainNav';
import { Highlight } from '@/components/atoms/Highlight';
import { pallete } from 'src/constant';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="max-w-4xl mx-auto px-4">
      <div className="flex justify-between py-5 mb-5 border-b border-gray-300">
        <Highlight type="underline" color={pallete.primary}>
          <strong>Agus.</strong>
        </Highlight>
        <MainNav />
      </div>
    </header>
  );
};

export default Header;
