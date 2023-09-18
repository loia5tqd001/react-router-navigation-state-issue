import {
  Await,
  Link,
  LoaderFunction,
  defer,
  useLoaderData,
} from 'react-router-dom';

const PRODUCT_IDS = Array.from({ length: 10 }).map(
  () => ~~(Math.random() * 100)
);

export const loader: LoaderFunction = () => {
  return defer({
    productIds: fetch(
      `https://hub.dummyapis.com/delay?seconds=1&product_list`
    ).then(() => PRODUCT_IDS),
  });
};

export function Component() {
  const { productIds } = useLoaderData() as { productIds: number[] };

  return (
    <div className='App'>
      <Await resolve={productIds}>
        {(productIds) => (
          <ul>
            {productIds.map((productId: number) => (
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
