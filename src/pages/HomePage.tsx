import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Await, Link, LoaderFunction, defer } from 'react-router-dom';
import { queryClient } from '..';

const PRODUCT_IDS = Array.from({ length: 10 }).map(
  () => ~~(Math.random() * 100)
);

const productListQuery = () => ({
  queryKey: ['product_list'],
  queryFn: async () =>
    axios
      .get(`https://hub.dummyapis.com/delay?seconds=1&product_list`)
      .then(() => PRODUCT_IDS),
});

export const loader: LoaderFunction = () => {
  return defer({
    data: queryClient.ensureQueryData(productListQuery()),
  });
};

export function Component() {
  const { data: productList } = useQuery(productListQuery());

  return (
    <div className='App'>
      <Await resolve={productList}>
        {(productIds: typeof productList) => (
          <ul>
            {productIds?.map((productId: number) => (
              <li key={productId}>
                <Link to={`${productId}`}>Product {productId}</Link>
              </li>
            ))}
          </ul>
        )}
      </Await>
    </div>
  );
}

export default Component;
