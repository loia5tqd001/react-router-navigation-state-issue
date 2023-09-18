import { Suspense } from 'react';
import './Loader.css';

export function Component() {
  return <div className='circle-spin-2'></div>;
}

export function LoaderProvider({ children }: React.PropsWithChildren) {
  return <Suspense fallback={<Component />}>{children}</Suspense>;
}

export default Component;
