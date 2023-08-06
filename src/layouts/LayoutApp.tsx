import React, { FC } from 'react';
import Footer from './Footer';
import Header from './Header';

interface ILayoutApp {
  children: React.ReactNode;
}
const LayoutApp: FC<ILayoutApp> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      <main className="flex-grow">{children}</main>

      {/* INI FOOTER */}
      <div className="border-t text-sm text-gray-500 py-4 border-gray-300 text-center">
        © 2023. codewithagus. All rights reserved
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutApp;
