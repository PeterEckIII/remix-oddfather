import type { LinksFunction } from 'remix';
import { Link } from 'remix';
import styles from './styles.css';
import { FiChevronRight } from 'react-icons/fi';
import Tooltip from '~/components/UI/Tooltip';

export const link: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

type OddsButtonProps = {
  gameId: string;
};

const OddsButton = ({ gameId }: OddsButtonProps) => (
  <div className='odds-button-container'>
    <div className='odds-button-content'>
      <Tooltip
        direction='top'
        content='Game and odds information'
        className='tooltip'
      >
        <Link to={`/games/${gameId}`} className='chevron'>
          <FiChevronRight height={6} width={6} />
        </Link>
      </Tooltip>
    </div>
  </div>
);

export default OddsButton;
