import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, LoaderFunction, defer } from 'react-router-dom';
import { queryClient } from '..';
import { Waiter } from './Loader';

const productListQuery = () => ({
  queryKey: ['product_list'],
  queryFn: async () =>
    axios.get(`/api/fetch_product_list`).then((res) => res.data.data),
});

export const loader: LoaderFunction = ({ request }) => {
  console.log('>>', { request });
  return defer({
    data: queryClient.ensureQueryData(productListQuery()),
  });
};

export function Component() {
  console.log('>>Render: HomePage');
  const { data: productList } = useQuery(productListQuery());

  return (
    <div className='App'>
      <Waiter>
        <ul>
          {productList?.map((productId: number) => (
            <li key={Math.random()}>
              <Link to={`${productId}`}>Product {productId}</Link>
            </li>
          ))}
        </ul>
      </Waiter>
    </div>
  );
}

export default Component;
