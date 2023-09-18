import { Link, LoaderFunction, defer, useLoaderData } from 'react-router-dom';

const productIds = Array.from({ length: 10 }).map(
  () => ~~(Math.random() * 100)
);

export const loader: LoaderFunction = () => {
  return defer({
    productIds: fetch(
      `https://hub.dummyapis.com/delay?seconds=1&product_list`
    ).then((res) => res.json()),
  });
};

export function Component() {
  useLoaderData();

  return (
    <div className='App'>
      {productIds.map((id) => {
        return <Link to={'/' + id}>Product {id}</Link>;
      })}
    </div>
  );
}

export default Component;
