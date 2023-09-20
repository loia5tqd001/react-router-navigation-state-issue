import { useIsFetching } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { Link, Outlet, useLoaderData, useNavigation } from 'react-router-dom';
import LoadingBar, {
  LoadingBarRef,
  IProps as TopLoadingBarProps,
} from 'react-top-loading-bar';
import './Host.css';
import { Waiter } from './Loader';

const useLoadingBar = (shouldLoadingBarRunning: boolean) => {
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const isLoadingBarRunning = useRef(false);

  useEffect(() => {
    let timeout: any;

    if (shouldLoadingBarRunning) {
      timeout = setTimeout(() => {
        loadingBarRef.current?.continuousStart();
        isLoadingBarRunning.current = true;
      }, 300);
    }

    if (!shouldLoadingBarRunning && isLoadingBarRunning.current) {
      loadingBarRef.current?.complete();
    }

    return () => clearTimeout(timeout);
  }, [shouldLoadingBarRunning]);

  return useMemo(
    () =>
      (...otherProps: any) =>
        (
          <LoadingBar
            color='#f11946'
            height={3}
            ref={loadingBarRef}
            waitingTime={400}
            loaderSpeed={300}
            {...otherProps}
          />
        ),
    []
  );
};

function GlobalLoaderProvider({
  children,
  ...otherProps
}: React.PropsWithChildren & TopLoadingBarProps) {
  const navigation = useNavigation();
  const isRQFetching = useIsFetching();

  const LoadingBarComponent = useLoadingBar(
    navigation.state === 'loading' || isRQFetching > 0
  );

  console.log('>>', { navigation: navigation.state, isRQFetching });

  return (
    <>
      <LoadingBarComponent {...otherProps} />
      {children}
    </>
  );
}

export function Component() {
  const { data } = useLoaderData() as { data?: string };

  return (
    <GlobalLoaderProvider>
      <div className='host'>
        <div className='host-header box'>
          <Link to='/'>Home</Link>
          <Link to='/user/purchase'>Order List</Link>
          <h3 className='host-header-title'>
            <Waiter resolve={data}>{(data) => data}</Waiter>
          </h3>
        </div>
        <Outlet />
      </div>
    </GlobalLoaderProvider>
  );
}

export default Component;
