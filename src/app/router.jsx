import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import Loader from '../components/common/Loader';
import Dashboard from '../features/dashboard/Dashboard';
import TestCatalogue from '../features/tests/TestCatalogue';
import BookingCart from '../features/cart/BookingCart';
import Placeholder from '../components/common/Placeholder';

// Test details pulls in the 3D sample tube, so keep it out of the main bundle.
const TestDetails = lazy(() => import('../features/tests/TestDetails'));

const lazyPage = (el) => <Suspense fallback={<Loader label="Loading…" />}>{el}</Suspense>;

/**
 * Route table (owner: Mohammed). Feature owners swap the <Placeholder/> for their page.
 */
export const router = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/tests', element: <TestCatalogue /> },
      { path: '/tests/:testId', element: lazyPage(<TestDetails />) },
      { path: '/cart', element: <BookingCart /> },
      { path: '/patient', element: <Placeholder title="Patient details" owner="Dhanu" folder="features/patient" /> },
      { path: '/schedule', element: <Placeholder title="Choose date & time" owner="Dhanu" folder="features/schedule" /> },
      { path: '/review', element: <Placeholder title="Review booking" owner="Yashodhar" folder="features/booking-review" /> },
      { path: '/confirmation/:reference', element: <Placeholder title="Booking confirmation" owner="Yashodhar" folder="features/confirmation" /> },
      { path: '/bookings', element: <Placeholder title="My bookings" owner="Yashodhar" folder="features/bookings" /> },
      { path: '/bookings/:id', element: <Placeholder title="Booking details" owner="Yashodhar" folder="features/bookings" /> },
      { path: '*', element: <Placeholder title="Page not found" owner="—" folder="" notFound /> },
    ],
  },
]);
