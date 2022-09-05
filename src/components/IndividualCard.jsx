/* eslint-disable */
import { faBriefcase, faCircle, faGlobe } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const IndividualCard = (props) => {
  const { user, indOptsMap } = props;

  return (
    <Card sx={{ display: 'flex' }} className="w-full">
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={`https://picsum.photos/400?random=${user.first_name}`}
      />
      <Box className="flex flex-col items-stretch">
        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
          <Typography component="div" variant="h5">
            {`${user.first_name } ${user.last_name}`}
          </Typography>
          <Box className="flex items-center justify-between">
            <Box>

            </Box>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" component="div">
          </Typography>
        </CardContent>
        <Box
          className="px-4 pb-4  text-right"
        >
          <div className="float-right">
            <Typography component="div" className="flex items-center">
              <FontAwesomeIcon className="ml-2" icon={faBriefcase} size="xs" />
            </Typography>
          </div>
        </Box>
      </Box>

    </Card>
  );
};

IndividualCard.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  indOptsMap: PropTypes.instanceOf(Object).isRequired
};

export default IndividualCard;
