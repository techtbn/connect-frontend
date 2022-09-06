/* eslint-disable */
import { faCalendarAlt, faComments } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const EngageCard = (props) => {
  const { comm, setEngage } = props;
  console.log(comm);

  return (
    <Card className="w-full">
      <CardContent>
        <div className="flex flex-wrap items-center justify-between w-full">
          <Box
            className="basis-full md:basis-4/12"
          >
            <Link href="#">
              <Typography variant="h5" component="div">
                {comm.pfield}
              </Typography>
            </Link>

            <Typography
              className="text-xs mt-2"
              color="text.secondary"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" fixedWidth />
              {comm.created}
            </Typography>

          </Box>
          <Divider
            className="hidden md:block mx-2 h-12"
            orientation="vertical"
          />
          <Divider
            className="block md:hidden my-4 w-full"
          />
          <div className="md:basis-4/12">
            <Typography variant="body2">
              {comm.text}
            </Typography>
          </div>
          {/*
          <Divider className="hidden md:block mx-4 h-12" orientation="vertical" />
          <div className="basis-8/12 md:basis-2/12 ">
            <Chip label="Pending" />
            <Chip label="3 Months" />
          </div>
      */}
          <Divider className="hidden md:block mx-4 h-12" orientation="vertical" />
          <Button
            variant="contained"
            size="large"
            onClick={() => setEngage(comm)}
          >
            <Badge badgeContent={comm.mcount} invisible={!comm.mcount}color="secondary">
              <FontAwesomeIcon icon={faComments} />
            </Badge>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

EngageCard.propTypes = {
  comm: PropTypes.instanceOf(Object).isRequired,
  setEngage: PropTypes.func.isRequired
};

export default EngageCard;
