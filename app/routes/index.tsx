import { LinksFunction, MetaFunction, Link } from 'remix';
import stylesUrl from '~/styles/index.css';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  const description = `Oddfather brings you the best sports odds from across the web. Combining book values with our proprietary data model allows our service to notify you when "value" is found in an event.`;
  return {
    title: 'Oddfather Betting | Home',
    description,
  };
};

export default function IndexRoute() {
  return (
    <div className='home-container'>
      <main>
        <h1 className='home-heading'>Oddfather</h1>
        <h4 className='home-subheading'>
          Today's top sports betting opportunities
        </h4>
        <div className='home-content'>
          <button className='home-button-link'>
            <Link to='/register'>Sign Up</Link>
          </button>
          <button className='home-button-link'>
            <Link to='/login'>Log In</Link>
          </button>
        </div>
      </main>
    </div>
  );
}
