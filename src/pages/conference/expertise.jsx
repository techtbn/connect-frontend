import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ExpertiseCards from 'components/ExpertiseCards';
import { HOST_DOMAIN } from 'constants/site';
import { userContext } from 'contexts/Auth';
import { useContext } from 'react';
import QRCode from 'react-qr-code';
import { apiList } from 'services/api';
import useSWR from 'swr';

const exRange = [0, 2, 4, 6, 8];

const ConferenceApp = () => {
  const { authToken } = useContext(userContext);

  let expertise = [];
  const expQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (expQuery.data) {
    expertise = expQuery.data;
  }

  let funders = [];
  const fundersQuery = useSWR(
    'funders',
    () => apiList('/funders/', '', authToken),
    { refreshInterval: 100000 }
  );

  if (fundersQuery.data) {
    funders = fundersQuery.data;
  }

  let indOptsMap = {};
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOptsMap = Object.fromEntries(indsQuery.data.map((ind) => [ind.slug, ind.name]));
  }

  return (
    <div style={{ backgroundColor: '#e6fffb' }}>
      <Typography className="text-white p-2 text-center" style={{ backgroundColor: 'black' }} variant="h3" component="div">
        Impact Networking Board - Individual Expertise & Funders
      </Typography>

      <Box
        className="grid"
        sx={{
          height: 'calc(100vh - 72px)',
          gridTemplateColumns: `repeat(${(expertise.length / 2) + 1}, minmax(0, 1fr))`
        }}
      >
        {exRange.map((exId) => (
          <div className="flex flex-col">
            <ExpertiseCards exType={expertise[exId]} />
            <ExpertiseCards exType={expertise[exId + 1]} />
          </div>
        ))}
        <div>
          <Typography className="text-white text-center p-2 flex items-center justify-center" style={{ backgroundColor: '#061178', minHeight: 100 }} variant="h4" component="div">
            Funders
          </Typography>
          <div className="grow">
            <div className="px-1 flex-auto">
              {funders.map((funder) => (
                <Card className="flex relative w-full mb-4" key={funder.uuid}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={funder.logo ? funder.logo : `https://picsum.photos/400?random=${funder.uuid}`}
                  />

                  <CardContent className="grow">

                    <Typography gutterBottom variant="h4" component="div" className="flex items-center  justify-between">
                      {funder.name}
                    </Typography>
                    <div className="mt-3">
                      <strong className="text-lg">
                        {funder.industries.map((ind) => indOptsMap[ind]).join(', ')}
                      </strong>
                    </div>
                  </CardContent>
                  <Divider orientation="vertical" className="h-40 m-l-4" />
                  <div className="flex flex-col items-center justify-center h-40 mx-4">
                    <QRCode value={`${HOST_DOMAIN}/funders/?name=${funder.name}`} size={180} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default ConferenceApp;
