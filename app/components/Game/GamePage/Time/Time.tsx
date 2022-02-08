import { formatDateForGamePage } from '~/utils/dates';

type TimeProps = {
  datetimeEpoch: number;
};

const Time = ({ datetimeEpoch }: TimeProps) => {
  const newDate = new Date(datetimeEpoch);
  const time = formatDateForGamePage(newDate);
  return (
    <div className='time-container'>
      <p>{time}</p>
    </div>
  );
};

export default Time;
