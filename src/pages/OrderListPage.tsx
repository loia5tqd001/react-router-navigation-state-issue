import axios from 'axios';
import {
  Link,
  LoaderFunction,
  NavLink,
  NavLinkProps,
  defer,
  useLoaderData,
} from 'react-router-dom';
import { queryClient } from '..';
import { Waiter } from './Loader';
import './OrderListPage.css';

const ORDER_IDS = [
  [1, 2],
  [3, 4, 5],
];

const getOrderListQuery = (tab: string | null) => ({
  queryKey: ['order_list_page', tab],
  queryFn: async () =>
    axios
      .get(
        `https://hub.dummyapis.com/delay?seconds=2&fetch_order_list&tab=${tab}`
      )
      .then(() => {
        const CHANCE = 0.1;
        const random = Math.random();
        const [giver, receiver] =
          random < CHANCE
            ? [0, 1]
            : random > 1 - CHANCE
            ? [1, 0]
            : [null, null];
        if (giver != null && receiver != null) {
          const pop = ORDER_IDS[giver].pop();
          if (pop) ORDER_IDS[receiver].push(pop);
        }

        switch (tab) {
          case '2':
            return ORDER_IDS[0];
          case '3':
            return ORDER_IDS[1];
          case '1':
          default:
            return ORDER_IDS.flat();
        }
      }),
});

const getOrderCountQuery = () => ({
  queryKey: ['order_count'],
  queryFn: async () =>
    axios
      .get(`https://hub.dummyapis.com/delay?seconds=4&fetch_order_count`)
      .then(() => 5),
});

export const loader: LoaderFunction = ({ request }) => {
  const tab = new URL(request.url).searchParams.get('tab');
  return defer({
    orderList: queryClient.ensureQueryData(getOrderListQuery(tab)),
    orderCount: queryClient.ensureQueryData(getOrderCountQuery()),
  });
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

      <Waiter resolve={loaderData.orderList}>
        {(orderList) => {
          return orderList?.map((id: number) => {
            return <Link to={'/user/purchase/order/' + id}>Order {id}</Link>;
          });
        }}
      </Waiter>
    </div>
  );
}

export default Component;
