import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

export default function PageLayout() {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 pt-6 sm:px-6">
        <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>
          <Outlet />
        </motion.div>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
