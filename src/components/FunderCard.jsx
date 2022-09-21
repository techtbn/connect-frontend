import { faBriefcase, faCircle, faGlobe } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { fundingTypesColorsMap } from 'configs/partners';
import PropTypes from 'prop-types';

const FunderCard = (props) => {
  const { funder, indOptsMap } = props;

  return (
    <Card sx={{ display: 'flex' }} className="w-full">
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={funder.logo ? funder.logo : `https://picsum.photos/400?random=${funder.uuid}`}
      />
      <Box className="flex grow flex-col items-stretch">
        <CardContent sx={{ flex: '1 0 auto', pb: 1 }}>
          <Typography component="div" variant="h5">
            {funder.name}
          </Typography>
          <Box className="flex items-center justify-between">
            <a href={funder.website} target="_blank" rel="noreferrer">
              <Typography component="div">
                <FontAwesomeIcon className="mr-2" icon={faGlobe} size="xs" />
                Website
              </Typography>
            </a>
            <Box>
              {funder.vehicles.map((ft) => (
                <FontAwesomeIcon className="ml-2 filter-circle" icon={faCircle} color={fundingTypesColorsMap[ft]} />
              ))}
            </Box>
          </Box>

          <Typography variant="subtitle1" color="text.secondary" component="div">
            {funder.description}
          </Typography>
        </CardContent>
        <Box
          className="px-4 pb-4"
        >
          <div className="float-right text-right">
            <Typography component="div" className="flex items-center">
              <span>{funder.industries.map((ind) => indOptsMap[ind]).join(', ')}</span>
              <FontAwesomeIcon className="ml-2" icon={faBriefcase} size="xs" />
            </Typography>
          </div>
        </Box>
      </Box>

    </Card>
  );
};

FunderCard.propTypes = {
  funder: PropTypes.instanceOf(Object).isRequired,
  indOptsMap: PropTypes.instanceOf(Object).isRequired
};

export default FunderCard;
