type ScoreProps = {
  homeScore: string;
  awayScore: string;
};

const Score = ({ homeScore, awayScore }: ScoreProps) => (
  <div className='score-container'>
    <p className='score'>{homeScore}</p>
    <p className='score'> &nbsp; </p>
    <p className='score'>{awayScore}</p>
  </div>
);

export default Score;
