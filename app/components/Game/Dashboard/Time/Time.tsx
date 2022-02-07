type TimeProps = {
  datetimeEpoch: number;
};

const Time = ({ datetimeEpoch }: TimeProps) => {
  // get formatted date for game card
  // formatDateForGameCard(datetimeEpoch)
  return (
    <div>
      <p className='gametime'>{datetimeEpoch}</p>
    </div>
  );
};

export default Time;
