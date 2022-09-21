import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import PropTypes from 'prop-types';

const OpportunityCard = (props) => {
  const { opp } = props;
  return (
    <Link href={`/opportunities/${opp.uuid}`}>
      <Card className="w-full">
        <CardContent>
          <Typography variant="h5" component="div">
            {opp.name}
          </Typography>
          <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
            {opp.created}
          </Typography>
          <Typography variant="body2">
            {`${opp.text.substring(0, 100)}${opp.text.length > 100 ? '...' : ''} `}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">JOIN DISCUSSION</Button>
        </CardActions>
      </Card>
    </Link>
  );
};

OpportunityCard.propTypes = {
  opp: PropTypes.instanceOf(Object).isRequired
};

export default OpportunityCard;
