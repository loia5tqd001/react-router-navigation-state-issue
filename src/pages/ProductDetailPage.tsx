import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunction, useParams } from 'react-router-dom';
import { queryClient } from '..';

const pdpQuery = (productId: string | undefined) => ({
  queryKey: ['product_detail_page', productId],
  queryFn: async () =>
    axios.get(`/api/fetch_product_detail`).then(() => productId),
});

export const loader: LoaderFunction = ({ params }) => {
  return queryClient.ensureQueryData(pdpQuery(params.productId));
};

export function Component() {
  console.log('>>Render: ProductDetailPage');
  const params = useParams();
  const { data: productId } = useQuery(pdpQuery(params.productId));

  return (
    <div className='App'>
      <h1>ProductDetailPage {productId}</h1>
    </div>
  );
}

export default Component;
