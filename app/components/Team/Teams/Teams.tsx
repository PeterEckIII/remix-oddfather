import Team from "../Team";

type TeamsProps = {
  homeShortname: string;
  awayShortname: string;
};

const Teams = ({ homeShortname, awayShortname }: TeamsProps) => {
  // get logos

  return (
    <div className="teams-container">
      <div className="home-team-container">
        <Team logo="" shortname={homeShortname} />
      </div>
      <div className="away-team-container">
        <Team logo="" shortname={awayShortname} />
      </div>
    </div>
  );
};

export default Teams;
