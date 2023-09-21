import { Suspense } from 'react';
import { Await, AwaitProps, useLoaderData } from 'react-router-dom';
import './Loader.css';

export function LoadingBarCSS() {
  return <div className='loading-bar loading-bar--active' />;
}

export function SpinnerCSS() {
  return <div className='circle-spin' />;
}

type Props = Omit<AwaitProps, 'resolve'> &
  Partial<Pick<AwaitProps, 'resolve'>> & {
    waitFor?: (loaderData: any) => any;
  };

export function Waiter({ waitFor, ...otherProps }: Props) {
  console.log('>>Render: Waiter');
  const loaderData = useLoaderData() as any;
  const toResolve = waitFor?.(loaderData) || loaderData.data;

  return (
    <Suspense fallback={<LoadingBarCSS />}>
      <Await resolve={toResolve} {...otherProps} />
    </Suspense>
  );
}
