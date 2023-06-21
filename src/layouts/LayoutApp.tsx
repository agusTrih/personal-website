import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

interface ILayoutApp {
  children: React.ReactNode;
}
const LayoutApp: FC<ILayoutApp> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutApp;
