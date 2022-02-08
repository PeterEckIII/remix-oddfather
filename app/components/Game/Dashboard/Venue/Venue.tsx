type VenueProps = {
  venue: string;
};

const Venue = ({ venue }: VenueProps) => (
  <div className='venue-container'>
    <p className='venue-text'>{venue}</p>
  </div>
);

export default Venue;
