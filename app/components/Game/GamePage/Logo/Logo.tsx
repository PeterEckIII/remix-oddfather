type LogoProps = {
  logo: string;
  id: string;
  shortname: string;
};

const baseUrl = `https://mlb-logo-bucket.s3.amazonaws.com`;

const Logo = ({ logo, shortname }: LogoProps) => (
  <div className="logo-container">
    <div className="logo-content">
      <img src={`${baseUrl}${logo}`} alt={`${shortname} logo`} />
    </div>
  </div>
);

export default Logo;
