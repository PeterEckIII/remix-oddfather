type TeamProps = {
  logo: string;
  shortname: string;
};

const Team = ({ logo, shortname }: TeamProps) => (
  <div className='team-container'>
    <div>Logo</div>
    <div className='name-container'>
      <p>{shortname}</p>
    </div>
  </div>
);

export default Team;
