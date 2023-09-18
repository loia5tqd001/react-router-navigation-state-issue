import { LoaderFunction, useLocation } from 'react-router-dom';

export const loader: LoaderFunction = () => {
  return fetch(`https://hub.dummyapis.com/delay?seconds=1&product_detail_page`);
};

export function Component() {
  const location = useLocation();

  return (
    <div className='App'>
      <h1>ProductDetailPage {location.pathname}</h1>
    </div>
  );
}

export default Component;
