import Navbar from './navbar';
import Footer from './footer';
import type { ReactNode } from 'react';

function Layout({ children }:{ children: ReactNode }): JSX.Element {
    return (
      <div className="h-full">
        <div className="min-h-full">
          <Navbar />
            <main className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>{children}</main>
          <Footer />
        </div>
      </div>
    );
}

export default Layout;
