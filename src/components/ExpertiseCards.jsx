import { faCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { individualTypesColorsMap, individualTypesLabelMap } from 'configs/individuals';
import { HOST_DOMAIN } from 'constants/site';
import { userContext } from 'contexts/Auth';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import QRCode from 'react-qr-code';
import { apiList } from 'services/api';
import useSWR from 'swr';

const qs = require('qs');

const ExpertiseCards = (props) => {
  const { authToken } = useContext(userContext);
  const { exType } = props;

  const jformat = qs.stringify({
    extypes: [exType.slug]
  }, { indices: false });

  let users = [];
  const usersQuery = useSWR(
    ['opps', exType.slug],
    () => apiList('/users/', jformat, authToken),
    { refreshInterval: 100000 }
  );

  if (usersQuery.data) {
    users = usersQuery.data;
  }

  return (
    <>
      <Typography className="text-white text-center p-2 flex items-center justify-center" sx={{ backgroundColor: '#061178', minHeight: 100 }} variant="h4" component="div">
        {exType.name}
      </Typography>
      <div className="grow">
        <div className="px-1 flex-auto">
          {users.map((user) => (
            <Card className="flex relative w-full mb-4" key={user.id}>
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image="/user.png"
              />

              <CardContent className="grow">

                <Typography gutterBottom variant="h4" component="div" className="flex items-center  justify-between">
                  {`${user.first_name} ${user.last_name}`}
                </Typography>
                <div className="mt-3">
                  <strong className="text-lg">
                    {user.org}
                  </strong>
                </div>
                <div className="mt-3">
                  <strong className="text-lg">
                    <FontAwesomeIcon className="mr-2" icon={faCircle} style={{ color: individualTypesColorsMap[user.commitment] }} />
                    {individualTypesLabelMap[user.commitment]}
                  </strong>
                </div>
              </CardContent>
              <Divider orientation="vertical" className="h-48 m-l-4" />
              <div className="flex flex-col items-center justify-center mx-4">
                <QRCode value={`${HOST_DOMAIN}/individuals/?name=${user.first_name} ${user.last_name}`} size={180} />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>

  );
};

ExpertiseCards.propTypes = {
  exType: PropTypes.instanceOf(Object)
};

ExpertiseCards.defaultProps = {
  exType: {}
};

export default ExpertiseCards;
