type TimeProps = {
  datetimeEpoch: number;
};

const Time = ({ datetimeEpoch }: TimeProps) => {
  // get formatted date and time using datetimeEpoch
  return (
    <div className="time-container">
      <p>{datetimeEpoch}</p>
    </div>
  );
};

export default Time;
