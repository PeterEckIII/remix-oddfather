import { Outlet } from 'remix';

export default function GamesRoute() {
  return (
    <main>
      <div>
        <Outlet />
      </div>
    </main>
  );
}
