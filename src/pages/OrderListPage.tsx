import {
  Await,
  Link,
  LoaderFunction,
  NavLink,
  NavLinkProps,
  defer,
  useLoaderData,
} from 'react-router-dom';
import { LoaderProvider } from './Loader';
import './OrderListPage.css';

const ORDER_IDS = [
  [1, 2],
  [3, 4, 5],
];

export const shouldRevalidate = () => true;

export const loader: LoaderFunction = ({ request }) => {
  switch (new URL(request.url).searchParams.get('tab')) {
    case '2':
      return defer({
        orderList: fetch(
          `https://hub.dummyapis.com/delay?seconds=2&fetch_order_list=to_receive`
        ).then(() => ORDER_IDS[0]),
      });

    case '3':
      return defer({
        orderList: fetch(
          `https://hub.dummyapis.com/delay?seconds=2&fetch_order_list=completed`
        ).then(() => ORDER_IDS[1]),
      });

    case '1':
    default:
      return defer({
        orderList: fetch(
          `https://hub.dummyapis.com/delay?seconds=2&fetch_order_list=all`
        ).then(() => ORDER_IDS.flat()),
        orderCount: fetch(
          `https://hub.dummyapis.com/delay?seconds=4&fetch_order_count`
        ),
      });
  }
};

export function Component() {
  const loaderData = useLoaderData() as {
    orderList?: number[];
    orderCount?: number;
  };

  const style: NavLinkProps['style'] = ({ isActive, isPending }) => {
    if (isActive) return { fontWeight: 'bold' };
    if (isPending) return { color: 'green' };
  };

  return (
    <div>
      <LoaderProvider>
        <div className='tab-container'>
          <NavLink to={{ search: 'tab=1' }} style={style}>
            All
          </NavLink>
          <NavLink to={{ search: 'tab=2' }} style={style}>
            To Receive
          </NavLink>
          <NavLink to={{ search: 'tab=3' }} style={style}>
            Completed
          </NavLink>
        </div>

        <Await resolve={loaderData.orderList}>
          {(orderList) => {
            return orderList?.map((id: number) => {
              return <Link to={'/user/purchase/order/' + id}>Order {id}</Link>;
            });
          }}
        </Await>
      </LoaderProvider>
    </div>
  );
}

export default Component;
