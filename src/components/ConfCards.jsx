import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
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
    otype
  }, { indices: false });

  let opps = [];
  const oppQuery = useSWR(
    ['opps', otype],
    () => apiList('/opportunities/', jformat, authToken),
    { refreshInterval: 1000 }
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  console.log(opps);

  return (
    <div className={`px-1 flex-auto ${otype === 'rev-gen-distribute-profits' ? 'grid grid-cols-2 gap-4' : ''}`}>
      {opps.map((opp, i) => (
        <Card className={`relative w-full ${i !== (opps.length - 1) && otype !== 'rev-gen-distribute-profits' ? 'mb-4' : ''}`} key={opp.id}>
          {otype === 'rev-gen-distribute-profits'
            ? (
              <div className="flex items-center">
                {![2, 3, 6, 7].includes(i)
                  ? <QRCode value="https://www.google.com/applesa sda" size={100} />
                  : null}
                <CardContent className="grow">
                  <Typography gutterBottom variant="h6" component="div" className="flex items-center">
                    {opp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {opp.org.name}
                  </Typography>
                </CardContent>
                {[2, 3, 6, 7].includes(i)
                  ? <QRCode value="https://www.google.com/applesa sda" size={100} />
                  : null}
              </div>
            )
            : (
              <div className="flex items-center">
                {i % 2 !== 1
                  ? <QRCode value="https://www.google.com/applesa sda" size={100} />
                  : null}
                <CardContent className="grow">
                  <Typography gutterBottom variant="h6" component="div" className="flex items-center">
                    {opp.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {opp.org.name}
                  </Typography>
                </CardContent>
                {i % 2 === 1
                  ? <QRCode value="https://www.google.com/applesa sda" size={100} />
                  : null}
              </div>
            )}
        </Card>
      ))}
    </div>
  );
};

ConfCards.propTypes = {
  otype: PropTypes.string.isRequired
};

export default ConfCards;
