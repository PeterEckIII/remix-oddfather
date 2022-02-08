import { formatDateForGameCard } from '~/utils/dates';

type TimeProps = {
  datetimeEpoch: number;
};

const Time = ({ datetimeEpoch }: TimeProps) => {
  const newDate = new Date(datetimeEpoch);
  const date = formatDateForGameCard(newDate);
  return (
    <div className='time-container'>
      <p className='gametime'>{date}</p>
    </div>
  );
};

export default Time;
