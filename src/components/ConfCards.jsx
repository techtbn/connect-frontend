import { faComments } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { HOST_DOMAIN } from 'constants/site';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import QRCode from 'react-qr-code';
import { apiList } from 'services/api';
import useSWR from 'swr';

const qs = require('qs');

const ConfCards = (props) => {
  const { authToken } = useContext(userContext);
  const { otype } = props;

  const jformat = qs.stringify({
    otype,
    limit: 6
  }, { indices: false });

  let opps = [];
  const oppQuery = useSWR(
    ['opps', otype],
    () => apiList('/opportunities/', jformat, authToken),
    { refreshInterval: 100000 }
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  return (
    <div className={`px-1 flex-auto ${otype === 'rev-gen-distribute-profits' ? 'grid grid-cols-2 gap-4' : ''}`}>
      {opps.map((opp, i) => (
        <Card className={`flex relative w-full ${i !== (opps.length - 1) && otype !== 'rev-gen-distribute-profits' ? 'mb-4' : ''}`} key={opp.id}>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={opp.org.logo ? opp.org.logo : `https://picsum.photos/400?random=${opp.org.uuid}`}
          />

          <CardContent className="grow">

            <Typography gutterBottom variant="h4" component="div" className="flex items-center  justify-between">
              <span>{opp.name}</span>
              <span>
                <FontAwesomeIcon icon={faComments} className="mr-2" />
                {opp.ccount}
              </span>
            </Typography>

            <p className="text-xl">
              {`${opp.text.substring(0, 100)}${opp.text.length > 100 ? '...' : ''}`}
            </p>
            <div className="mt-4">
              <strong className="text-lg">
                <span className="mr-2">By:</span>
                {opp.org.name}
              </strong>
            </div>
          </CardContent>
          <Divider orientation="vertical" className="h-40 m-l-4" />
          <div className="flex flex-col items-center justify-center h-40 mx-4">
            <QRCode value={`${HOST_DOMAIN}/opportunities/${opp.id}`} size={100} />
          </div>
        </Card>
      ))}
    </div>
  );
};

ConfCards.propTypes = {
  otype: PropTypes.string.isRequired
};

export default ConfCards;
