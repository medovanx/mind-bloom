// src/components/Layout.tsx
import { ReactNode } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Footer from '../components/Footer/Footer';

interface LayoutProps {
  children: ReactNode;
}

function PublicLayout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className='main-app'>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout
