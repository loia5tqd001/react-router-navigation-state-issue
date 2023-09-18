import { useEffect, useRef } from 'react';
import {
  Await,
  Link,
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import LoadingBar, {
  IProps as TopLoadingBarProps,
  LoadingBarRef,
} from 'react-top-loading-bar';
import './Host.css';
import { LoaderProvider } from './Loader';

function NavigationLoaderProvider({
  children,
  ...otherProps
}: React.PropsWithChildren & TopLoadingBarProps) {
  const navigation = useNavigation();
  const isRunning = useRef(false);
  const ref = useRef<LoadingBarRef>(null);

  console.log('>>', { navigation: navigation.state });

  useEffect(() => {
    let timeout: any;

    if (navigation.state === 'loading') {
      timeout = setTimeout(() => {
        ref.current?.continuousStart();
        isRunning.current = true;
      }, 300);
    }

    if (navigation.state === 'idle' && isRunning.current) {
      ref.current?.complete();
    }
    return () => clearTimeout(timeout);
  }, [navigation.state]);

  return (
    <>
      <LoadingBar
        color='#f11946'
        ref={ref}
        height={5}
        waitingTime={300}
        {...otherProps}
      />
      {children}
    </>
  );
}

// export const loader: LoaderFunction = () => {
//   return fetch(`https://hub.dummyapis.com/delay?seconds=1&fetch_header_data`);
// };

export function Component() {
  const { data } = useLoaderData() as { data?: string };

  return (
    <NavigationLoaderProvider>
      <div className='host'>
        <div className='host-header box'>
          <Link to='/'>Home</Link>
          <Link to='/user/purchase'>Order List</Link>
          <h3 className='host-header-title'>
            <LoaderProvider>
              <Await resolve={data}>{(data) => data}</Await>
            </LoaderProvider>
          </h3>
        </div>
        <Outlet />
      </div>
    </NavigationLoaderProvider>
  );
}

export default Component;
