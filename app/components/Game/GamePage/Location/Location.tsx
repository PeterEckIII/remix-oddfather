type LocationProps = {
  venue: string;
  city: string;
  state: string;
};

const Location = ({ venue, city, state }: LocationProps) => {
  const displayString = `${venue}, ${city}, ${state}`;

  return (
    <div className="location-container">
      <p className="location-text">{displayString}</p>
    </div>
  );
};

export default Location;
