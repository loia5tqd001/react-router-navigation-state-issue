import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import {
  Link,
  LoaderFunction,
  NavLink,
  NavLinkProps,
  defer,
  useSearchParams,
} from 'react-router-dom';
import { queryClient } from '..';
import { Waiter } from './Loader';
import './OrderListPage.css';

const getOrderCountQuery = () => ({
  queryKey: ['order_count'],
  queryFn: async () =>
    axios.get(`/api/fetch_order_count`).then((res) => res.data.data),
});

const getOrderListQuery = (tab: string | null) => ({
  queryKey: ['order_list_page', tab],
  queryFn: async () =>
    axios.get(`/api/fetch_order_list?tab=${tab}`).then((res) => res.data.data),
});

export const loader: LoaderFunction = ({ request }) => {
  const tab = new URL(request.url).searchParams.get('tab');
  return defer({
    orderList: queryClient.ensureQueryData(getOrderListQuery(tab)),
    orderCount: queryClient.ensureQueryData(getOrderCountQuery()),
  });
};

export function Component() {
  console.log('>>Render: OrderListPage');
  const [searchParams, setSearchPrams] = useSearchParams();
  const { data: orderList } = useQuery(
    getOrderListQuery(searchParams.get('tab'))
  );
  const { data: orderCount } = useQuery(getOrderCountQuery());

  useEffect(() => {
    if (!searchParams.get('tab')) {
      setSearchPrams({ tab: '1' });
    }
  }, [searchParams, setSearchPrams]);

  const style: NavLinkProps['style'] = ({ isActive, isPending }) => {
    if (isActive) return { fontWeight: 'bold' };
    if (isPending) return { color: 'green' };
  };

  return (
    <div>
      <div className='tab-container'>
        <NavLink to={{ search: 'tab=1' }} style={style}>
          All {orderCount ? `(${orderCount[0] + orderCount[1]})` : null}
        </NavLink>
        <NavLink to={{ search: 'tab=2' }} style={style}>
          To Receive {orderCount ? `(${orderCount[0]})` : null}
        </NavLink>
        <NavLink to={{ search: 'tab=3' }} style={style}>
          Completed {orderCount ? `(${orderCount[1]})` : null}
        </NavLink>
      </div>

      <Waiter waitFor={(data) => data.orderList}>
        {orderList?.map((id: number) => {
          return (
            <Link to={'/user/purchase/order/' + id} key={Math.random()}>
              Order {id}
            </Link>
          );
        })}
      </Waiter>
    </div>
  );
}

export default Component;
