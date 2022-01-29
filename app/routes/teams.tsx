import { Outlet } from "remix";

export default function TeamsRoute() {
  return (
    <div>
      <h1>Teams</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
