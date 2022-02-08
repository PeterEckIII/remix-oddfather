import { formatDateForGameCard } from '~/utils/dates';

type TimeProps = {
  datetimeEpoch: number;
};

const Time = ({ datetimeEpoch }: TimeProps) => {
  const date = formatDateForGameCard(datetimeEpoch);
  return (
    <div className='time-container'>
      <p className='gametime'>{date}</p>
    </div>
  );
};

export default Time;
