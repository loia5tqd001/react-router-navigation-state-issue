import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderFunction, defer, useParams } from 'react-router-dom';
import { queryClient } from '..';
import { Waiter } from './Loader';

const odpQuery = (orderId: string | undefined) => ({
  queryKey: ['order_detail_page', orderId],
  queryFn: async () =>
    axios
      .get(`https://hub.dummyapis.com/delay?seconds=2&order_detail_page`)
      .then(() => orderId),
});

export const loader: LoaderFunction = ({ params }) => {
  return defer({
    data: queryClient.ensureQueryData(odpQuery(params.orderId)),
  });
};

export function Component() {
  const params = useParams();
  const { data } = useQuery(odpQuery(params.orderId));

  return (
    <Waiter resolve={data}>
      {(orderId: typeof data) => <h1>OrderDetailPage {orderId}</h1>}
    </Waiter>
  );
}

export default Component;
