import { faCalendarAlt, faComments } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const EngageCard = (props) => {
  const { comm, setEngage } = props;

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex items-center justify-between w-full">
          <Box
            className="grow"
          >
            <div className="flex items-center justify-between">
              <Link href={comm.purl}>
                <Typography variant="h5" component="div">
                  {comm.pfield}
                </Typography>
              </Link>
              <Typography
                className="text-xs"
                color="text.secondary"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" fixedWidth />
                {comm.created}
              </Typography>
            </div>
            <Typography className="mt-4" variant="body2">
              {comm.text}
            </Typography>
          </Box>

          {setEngage
            ? (
              <>
                <Divider className="mx-4 h-12" orientation="vertical" />
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setEngage(comm)}
                >
                  <Badge badgeContent={comm.mcount} invisible={!comm.mcount} color="secondary">
                    <FontAwesomeIcon icon={faComments} />
                  </Badge>
                </Button>
              </>
            )
            : null}

        </div>
      </CardContent>

    </Card>
  );
};

EngageCard.propTypes = {
  comm: PropTypes.instanceOf(Object).isRequired,
  setEngage: PropTypes.func
};

EngageCard.defaultProps = {
  setEngage: undefined
};

export default EngageCard;
