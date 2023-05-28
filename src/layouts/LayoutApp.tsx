import React, { FC } from 'react';
import Footer from './Footer';

interface ILayoutApp {
  children: React.ReactNode;
}
const LayoutApp: FC<ILayoutApp> = ({ children }) => {
  return (
    <div>
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutApp;
