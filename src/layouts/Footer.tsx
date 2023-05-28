import Linked from '@/components/atoms/Linked/Linked';
import { Paragraph } from '@/components/atoms/Paragraph';
import React, { FC } from 'react';
import cn from '~/utils/classNames';

interface FooterProps {
  variant: 'grey' | 'white';
}

const Footer: FC<FooterProps> = ({ variant }) => {
  const dataFooter = {
    socmed: [
      {
        title: 'Instagram',
        link: '',
        id: 1,
      },
      {
        title: 'Facebook',
        link: '',
        id: 2,
      },
      {
        title: 'Twitter',
        link: '',
        id: 3,
      },
    ],
    about: [
      {
        title: 'Kontak',
        link: '',
        id: 1,
      },
      {
        title: 'Tentang Kami',
        link: '',
        id: 2,
      },
      {
        title: 'Privacy Policy',
        link: '',
        id: 3,
      },
    ],
    copyright: '© 2023 All rights reserved',
  };

  return (
    <footer
      className={cn('p-6  bg-white', {
        'bg-[#F2F2F2]': variant === 'grey',
      })}
    >
      <ul className="flex justify-center">
        {dataFooter.socmed.map((item, index) => {
          return (
            <li key={item.id}>
              <Linked
                isExternal
                href={item.link}
                variant="default"
                bg="default"
                sizes="xs"
                className={index === 1 ? 'mx-4' : ''}
                colors="grey"
              >
                {item.title}
              </Linked>
            </li>
          );
        })}
      </ul>
      <ul className="flex justify-center ">
        {dataFooter.about.map((item, index) => {
          return (
            <li key={item.id}>
              <Linked
                isExternal
                href={item.link}
                variant="default"
                bg="default"
                sizes="xs"
                colors="grey"
                className={index === 1 ? 'mx-4' : ''}
              >
                {item.title}
              </Linked>
            </li>
          );
        })}
      </ul>
      <div className="text-center">
        <Paragraph text={dataFooter.copyright} size="sm" />
      </div>
    </footer>
  );
};

export default Footer;
