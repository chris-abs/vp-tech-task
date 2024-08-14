import { ReactNode } from 'react';
import Footer from '../Footer';
import Header from '../Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
