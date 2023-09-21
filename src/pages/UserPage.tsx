import { Outlet } from 'react-router-dom';
import './UserPage.css';

export function Component() {
  console.log('>>Render: UserPage');
  return (
    <div className='main'>
      <nav className='side-nav box'>
        <h1>SideNav</h1>
      </nav>
      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default Component;
