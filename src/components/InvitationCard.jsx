import { faAngleRight, faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import PropTypes from 'prop-types';

const InvitationCard = (props) => {
  const { invitation } = props;

  return (
    <Card className="w-full">
      <CardContent>
        <Box className="flex items-center justify-between">
          <div className="grow">
            <p className="block mb-4">{invitation.message}</p>
            <Button
              variant="outlined"
              size="small"
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          </div>
          <Link href={`/opportunities/${invitation.oppt.uuid}`}>
            <Button
              variant="contained"
              size="small"
              sx={{ padding: '3px', minWidth: '40px !important' }}
            >

              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </Link>

        </Box>

      </CardContent>

    </Card>
  );
};

InvitationCard.propTypes = {
  invitation: PropTypes.instanceOf(Object).isRequired
};

export default InvitationCard;
