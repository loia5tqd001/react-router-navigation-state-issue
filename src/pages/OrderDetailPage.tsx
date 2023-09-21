import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunction, defer, useParams } from 'react-router-dom';
import { queryClient } from '..';
import { Waiter } from './Loader';

const odpQuery = (orderId: string | undefined) => ({
  queryKey: ['order_detail_page', orderId],
  queryFn: async () => axios.get(`/api/fetch_order_detail`).then(() => orderId),
});

export const loader: LoaderFunction = ({ params }) => {
  return defer({
    data: queryClient.ensureQueryData(odpQuery(params.orderId)),
  });
};

export function Component() {
  console.log('>>Render: OrderDetailPage');
  const params = useParams();
  const { data: orderId } = useQuery(odpQuery(params.orderId));

  return (
    <h1>
      OrderDetailPage <Waiter>{orderId}</Waiter>
    </h1>
  );
}

export default Component;
