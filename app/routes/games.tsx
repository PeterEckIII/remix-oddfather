import { Outlet } from 'remix';

export default function GamesRoute() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
