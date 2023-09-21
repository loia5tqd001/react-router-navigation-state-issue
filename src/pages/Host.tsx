import { useIsFetching } from '@tanstack/react-query';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import './Host.css';
import { LoadingBarCSS, Waiter } from './Loader';

function GlobalLoaders({ children }: React.PropsWithChildren) {
  const navigation = useNavigation();
  const isRQFetching = useIsFetching();

  console.log('>>', { navigation: navigation.state, isRQFetching });

  return (
    <>
      {/* 
      LoadingBar shows: we have not had enough data on the page
      Spinner shows: we have had enough data on the page, but they might not be the most up-to-date
      => LoadingBar feels more critical than Spinner
       */}
      {/* {navigation.state === 'loading' ? (
        <LoadingBarCSS />
      ) : isRQFetching ? (
        <SpinnerCSS />
      ) : null} */}
      {navigation.state === 'loading' ? <LoadingBarCSS /> : null}
      {children}
    </>
  );
}

export function Component() {
  console.log('>>Render: Host');
  return (
    <GlobalLoaders>
      <div className='host'>
        <div className='host-header box'>
          <Link to='/'>Home</Link>
          <Link to='/user/purchase'>Order List</Link>
          <h3 className='host-header-title'>
            <Waiter>{(data) => data}</Waiter>
          </h3>
        </div>
        <Outlet />
      </div>
    </GlobalLoaders>
  );
}

export default Component;
