import axios from 'axios';
import { createBrowserRouter, defer } from 'react-router-dom';
// import Host from './pages/Host';
// import HomePage from './pages/HomePage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import UserPage from './pages/UserPage';
// import OrderListPage from './pages/OrderListPage';
// import OrderDetailPage from './pages/OrderDetailPage';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return defer({
        data: axios
          .get(`https://hub.dummyapis.com/delay?seconds=3&fetch_header_data`)
          .then(() => 'Header Data Fetched'),
      });
    },
    // Component: Host,
    lazy: () => import('./pages/Host'),
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        // Component: HomePage,
        lazy: () => import('./pages/HomePage'),
        shouldRevalidate: ({ currentUrl }) => {
          // WTF:
          // Home Page -> Order List Page (why call product_detail_list API here?)
          console.log('>>  ~ file: routes.tsx:29 ~ currentUrl:', currentUrl);
          return currentUrl.pathname === '';
        },
      },
      {
        path: ':productId',
        // loader,
        // Component: ProductDetailPage,
        lazy: () => import('./pages/ProductDetailPage'),
        // shouldRevalidate: () => false,
      },
      {
        path: 'user/purchase',
        // loader,
        // Component: UserPage,
        lazy: () => import('./pages/UserPage'),
        // shouldRevalidate: () => false,
        children: [
          {
            path: '',
            lazy: () => import('./pages/OrderListPage'),
            // shouldRevalidate: () => false,
          },
          {
            path: 'order/:orderId',
            // loader,
            // Component: OrderDetailPage,
            lazy: () => import('./pages/OrderDetailPage'),
            // shouldRevalidate: () => false,
          },
        ],
      },
    ],
  },
]);
