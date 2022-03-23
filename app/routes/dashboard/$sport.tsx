import { useParams } from 'remix';

export default function DashboardSportRoute() {
  const sport = useParams();
  return (
    <div>
      {/* Do something with the sport params like fetch baseball-specific games */}
      <p>Some content</p>
    </div>
  );
}
