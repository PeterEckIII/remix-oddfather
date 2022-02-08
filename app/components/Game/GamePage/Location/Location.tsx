type LocationProps = {
  venue: string;
  city: string;
  state: string;
};

const Location = ({ venue, city, state }: LocationProps) => (
  <div className='location-container'>
    <p className='location-text'>{venue}</p>
    <p className='location-text'>{`${city}, ${state}`}</p>
  </div>
);

export default Location;
