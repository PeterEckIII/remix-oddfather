import Logo from '~/components/Game/Dashboard/Logo';

type TeamProps = {
  logo: string;
  shortname: string;
};

const Team = ({ logo, shortname }: TeamProps) => (
  <div className='team-container'>
    <Logo shortname={shortname} logo={logo} />
    <div className='name-container'>
      <p>{shortname}</p>
    </div>
  </div>
);

export default Team;
