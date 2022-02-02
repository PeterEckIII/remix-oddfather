const baseUrl = `https://mlb-logo-bucket.s3.amazonaws.com`;

type LogoProps = {
  logo: string;
  shortname: string;
};

const Logo = ({ logo, shortname }: LogoProps) => (
  <div>
    <img
      height="50px"
      width="50px"
      src={`${baseUrl}${logo}`}
      alt={`${shortname} logo`}
    />
  </div>
);

export default Logo;
