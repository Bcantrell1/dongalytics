import Navbar from './navbar';
import Footer from './footer';
import type { ReactNode } from 'react';

function Layout({ children }:{ children: ReactNode }): JSX.Element {
    return (
      <div className="h-full">
        <div className="min-h-full">
          <Navbar />
            <main className='min-h-screen mx-auto max-w-7xl'>{children}</main>
          <Footer />
        </div>
      </div>
    );
}

export default Layout;
