type ScoresProps = {
  homeScore: string;
  awayScore: string;
};

const Scores = ({ homeScore, awayScore }: ScoresProps) => (
  <div>
    <div>{homeScore}</div>
    <div>{awayScore}</div>
  </div>
);

export default Scores;
