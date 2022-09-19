/* eslint-disable */
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ConfCards from 'components/ConfCards';
import { userContext } from 'contexts/Auth';
import { useContext } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';

const exRange = [0, 1, 2, 3, 4];

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

  return (
    <div>
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
        {exRange.map((exp) => (
          <div className="flex flex-col">
            <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#5cdbd3' }} variant="h4" component="div">
              Funders
            </Typography>
            <div className="grow">
              <ConfCards otype="impact-grants" />
            </div>
            <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#5cdbd3' }} variant="h4" component="div">
              Funders
            </Typography>
            <div className="grow">
              <ConfCards otype="impact-grants" />
            </div>
          </div>
        ))}
        <div>
          <Typography className="text-white p-2 text-center" style={{ backgroundColor: '#5cdbd3' }} variant="h4" component="div">
            Funders
          </Typography>
        </div>
      </Box>
    </div>
  );
};

export default ConferenceApp;
