import type { LinksFunction } from 'remix';
import { Link } from 'remix';
import styles from './styles.css';

export const link: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type OddsButtonProps = {
  gameId: string;
};

const OddsButton = ({ gameId }: OddsButtonProps) => (
  <div className='odds-button-container'>
    <div className='odds-button-content'>
      {/* need chevron logo */}
      <Link to={`/games/${gameId}`} />
    </div>
  </div>
);

export default OddsButton;
