import { createBrowserRouter, defer } from 'react-router-dom';
// import Host from './pages/Host';
// import HomePage from './pages/HomePage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import UserPage from './pages/UserPage';
// import OrderListPage from './pages/OrderListPage';
// import OrderDetailPage from './pages/OrderDetailPage';

// const loader = ({ request }: any) => {
//   return fetch(
//     `https://raw.githubusercontent.com/NearHuscarl/leetcode/master/src/api/list/all.json?${request.url}`
//   );
// };

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return defer({
        data: fetch(
          `https://hub.dummyapis.com/delay?seconds=3&fetch_header_data`
        ).then(() => 'Header Data Fetched'),
      });
    },
    // Component: Host,
    lazy: () => import('./pages/Host'),
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        // loader,
        // Component: HomePage,
        lazy: () => import('./pages/HomePage'),
        shouldRevalidate: () => false,
      },
      {
        path: ':productId',
        // loader,
        // Component: ProductDetailPage,
        lazy: () => import('./pages/ProductDetailPage'),
        shouldRevalidate: () => false,
      },
      {
        path: 'user/purchase',
        // loader,
        // Component: UserPage,
        lazy: () => import('./pages/UserPage'),
        shouldRevalidate: () => false,
        children: [
          {
            path: '',
            lazy: () => import('./pages/OrderListPage'),
          },
          {
            path: '?tab=1',
            lazy: () => import('./pages/OrderListPage'),
          },
          {
            path: '?tab=2',
            lazy: () => import('./pages/OrderListPage'),
          },
          {
            path: '?tab=3',
            lazy: () => import('./pages/OrderListPage'),
          },
          {
            path: 'order/:orderId',
            // loader,
            // Component: OrderDetailPage,
            lazy: () => import('./pages/OrderDetailPage'),
            shouldRevalidate: () => false,
          },
        ],
      },
    ],
  },
]);
