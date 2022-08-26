import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const OrgJumbotron = (props) => {
  const { org } = props;
  return (
    <Card
      className="w-full mt-3"
      sx={{
        height: {
          xs: 300,
          md: 350
        },
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.2)), url("${org.banner}")`
      }}
    >
      <CardContent className="flex flex-col w-full items-center">
        <img src={org.logo} height="100" alt="org-img" />
        <Typography
          gutterBottom
          variant="h2"
          component="div"
          sx={{
            mt: 2,
            fontSize: {
              xs: '2.5rem',
              md: '3.75rem'
            }
          }}
          className="text-white text-center"
        >
          {org.name}
        </Typography>
        <Typography
          gutterBottom
          component="div"
          sx={{
            width: {
              xs: '100%',
              md: '50%'
            },
            fontSize: {
              xs: '1.5rem'
            }
          }}
          className="text-white text-center"
        >
          {org.mission}
        </Typography>
      </CardContent>
    </Card>
  );
};

OrgJumbotron.propTypes = {
  org: PropTypes.instanceOf(Object).isRequired
};

export default OrgJumbotron;
