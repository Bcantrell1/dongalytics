import Navbar from './navbar';
import Footer from './footer';
import type { ReactNode } from 'react';

function Layout({ children }:{ children: ReactNode }): JSX.Element {
    return (
      <div>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </div>
    );
}

export default Layout;
