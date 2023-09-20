import { Suspense } from 'react';
import { Await, AwaitProps } from 'react-router-dom';
import './Loader.css';

export function Component() {
  return <div className='circle-spin-2'></div>;
}

export function Waiter(awaitProps: AwaitProps) {
  return (
    <Suspense fallback={<Component />}>
      <Await {...awaitProps} />
    </Suspense>
  );
}

export default Component;
