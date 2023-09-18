import { Await, LoaderFunction, defer, useLoaderData } from 'react-router-dom';
import { LoaderProvider } from './Loader';

export const loader: LoaderFunction = ({ params }) => {
  return defer({
    data: fetch(
      `https://hub.dummyapis.com/delay?seconds=2&order_detail_page`
    ).then(() => params.orderId),
  });
};

export function Component() {
  const loaderData = useLoaderData() as {
    data?: string;
  };

  return (
    <LoaderProvider>
      <Await resolve={loaderData.data}>
        {(orderId) => <h1>OrderDetailPage {orderId}</h1>}
      </Await>
    </LoaderProvider>
  );
}

export default Component;
