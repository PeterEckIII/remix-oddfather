type ScoreProps = {
  homeScore: string;
  awayScore: string;
};

const Score = ({ homeScore, awayScore }: ScoreProps) => (
  <div className='score-container'>
    <p className='score-content'>{homeScore}</p>
    <p className='score-content'> - </p>
    <p className='score-content'>{awayScore}</p>
  </div>
);

export default Score;
