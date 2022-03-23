import { Outlet } from 'remix';

export default function DashboardIndexRoute() {
  return (
    <div className='dashboard-container'>
      <div className='outlet-container'>
        <Outlet />
      </div>
    </div>
  );
}
