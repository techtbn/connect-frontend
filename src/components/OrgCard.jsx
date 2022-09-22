import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { seColorsMap } from 'configs/ses';
import Link from 'next/link';
import PropTypes from 'prop-types';

const OrgCard = ({ org }) => (
  <Link href={`/organizations/${org.slug}/${org.id}`}>
    <Card className="relative w-full">
      <CardMedia
        component="img"
        height="140"
        image={org.banner ? org.banner : `https://picsum.photos/400?random=${org.slug}-${org.id}`}
      />
      <div className="org-logo">
        <img src={org.logo} alt="" />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" className="flex items-center">
          <FontAwesomeIcon icon={faCircle} size="sm" className="mr-2 filter-circle" style={{ color: seColorsMap[org.otype] }} />
          {org.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {org.mission}
        </Typography>
      </CardContent>
    </Card>
  </Link>
);

OrgCard.propTypes = {
  org: PropTypes.instanceOf(Object).isRequired
};

export default OrgCard;
