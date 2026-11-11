import { RouterProvider } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { router } from './router';
import { CartProvider } from './providers/CartProvider';
import { ToastProvider } from '../components/common/Toast';

export default function App() {
  return (
    // reducedMotion="user" makes Framer Motion honour prefers-reduced-motion
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
