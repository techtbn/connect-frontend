import { faBriefcase, faCircle, faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { individualTypesColorsMap } from 'configs/individuals';
import PropTypes from 'prop-types';

const IndividualCard = (props) => {
  const { user, expMap, setIndv } = props;
  return (
    <Card sx={{ display: 'flex' }} className="w-full">
      <CardMedia
        component="img"
        sx={{ width: 100 }}
        image={user.profile ? user.profile : '/user.png'}
      />
      <Box className="h-full grow flex-col items-stretch">
        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
          <div className="flex items-center justify-between">
            <Box className="grow">
              <Box className="flex items-center justify-between">
                <Typography className="mb-4 flex items-center" component="div" variant="h5">
                  <FontAwesomeIcon className="mr-2 filter-circle" icon={faCircle} color={individualTypesColorsMap[user.commitment]} />
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <span>{user.designation}</span>
              </Box>
              <div className="float-right text-right">
                <Typography component="div" className="flex items-center">
                  <span>{user.expertise.map((exp) => expMap[exp]).join(', ')}</span>
                  <FontAwesomeIcon className="ml-2" icon={faBriefcase} size="xs" />
                </Typography>
              </div>
            </Box>
            <Divider orientation="vertical" className="mx-4 h-16" />
            <Button
              variant="contained"
              size="large"
              onClick={() => setIndv(user)}
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </Button>

          </div>

        </CardContent>
      </Box>
    </Card>
  );
};

IndividualCard.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  expMap: PropTypes.instanceOf(Object).isRequired,
  setIndv: PropTypes.func.isRequired
};

export default IndividualCard;
