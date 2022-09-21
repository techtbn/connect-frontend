/* eslint-disable jsx-a11y/anchor-is-valid */
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EngageCard from 'components/EngageCard';
import InvitationCard from 'components/InvitationCard';
import MainLayout from 'components/MainLayout';
import OpportunityCard from 'components/OpportunityCard';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useContext } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';

const Home = () => {
  const { authToken, user } = useContext(userContext);

  let opps = [];
  const oppQuery = useSWR(
    ['opps', 'home'],
    () => apiList('/opportunities/', 'limit=4', authToken)
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  let comments = [];
  const commentsQuery = useSWR(
    ['comments', 'home'],
    () => apiList('/comments/', 'limit=4', authToken)
  );

  if (commentsQuery.data) {
    comments = commentsQuery.data;
  }

  let invitations = [];
  const invQuery = useSWR(
    ['invitations'],
    () => apiList('/invitations/', '', authToken)
  );

  if (invQuery.data) {
    invitations = invQuery.data;
  }

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        {`Welcome ${user.first_name}`}
      </Typography>
      <Divider />

      <Grid container xs={12} justify="center" spacing={2}>
        <Grid item xs={12} md={9} className="mt-4" order={{ xs: 2, md: 1 }}>
          <Box
            className="py-1 px-2 mb-4 w-full flex items-center justify-between"
            sx={{ backgroundColor: '#C4D630' }}
          >
            <Typography className="mb-0" variant="h5" color="textPrimary" gutterBottom>
              Opportunities
            </Typography>
            <Link href="/opportunities">
              <a>
                View More
                <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
              </a>
            </Link>
          </Box>
          <Grid className="test-cont" container item spacing={2}>
            {opps.map((opp) => (
              <Grid container item xs={12} md={6}>
                <OpportunityCard opp={opp} />
              </Grid>
            ))}
          </Grid>
          <Box
            className="py-1 px-2 my-4 w-full flex items-center justify-between"
            sx={{ backgroundColor: '#C4D630' }}
          >
            <Typography className="mb-0" variant="h5" color="textPrimary">
              My Engagements
            </Typography>
            <Link href="/engagements">
              <a>
                View More
                <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
              </a>
            </Link>
          </Box>

          <Grid className="test-cont" container item spacing={2}>
            {comments.map((comm) => (
              <Grid container item xs={12} md={6}>
                <EngageCard comm={comm} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3} className="mt-4" order={{ xs: 1, md: 2 }}>
          <Box
            className="py-1 px-2 mb-4 w-full flex-start"
            sx={{ backgroundColor: '#C4D630' }}
          >
            <Typography className="mb-0" variant="h5" color="textPrimary">
              Invitations
            </Typography>
          </Box>
          <Grid className="test-cont" container item>
            {invitations.map((inv) => (
              <InvitationCard invitation={inv} />
            ))}
          </Grid>
        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default Home;
