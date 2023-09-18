import { useEffect, useRef } from 'react';
import { Link, LoaderFunction, Outlet, useNavigation } from 'react-router-dom';
import LoadingBar, {
  IProps as TopLoadingBarProps,
  LoadingBarRef,
} from 'react-top-loading-bar';
import './Host.css';

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

export const loader: LoaderFunction = () => {
  return fetch(`https://hub.dummyapis.com/delay?seconds=1&fetch_header_data`);
};

export function Component() {
  return (
    <NavigationLoaderProvider>
      <div className='host'>
        <div className='host-header box'>
          <Link to='/'>Home</Link>
          <Link to='/user/purchase'>Order List</Link>
        </div>
        <Outlet />
      </div>
    </NavigationLoaderProvider>
  );
}

export default Component;
