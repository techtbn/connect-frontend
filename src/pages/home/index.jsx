/* eslint-disable jsx-a11y/anchor-is-valid */
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import EngageCard from 'components/EngageCard';
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

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        {`Welcome ${user.first_name}`}
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={9} className="mt-4">
            <div className="w-full flex items-center justify-between">
              <Typography className="mt-3 " variant="h5" color="textPrimary" gutterBottom>
                - Opportunities
              </Typography>
              <Link href="/opportunities">
                <a>
                  View More
                  <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
                </a>
              </Link>
            </div>
            <Grid className="test-cont" container item spacing={2}>
              {opps.map((opp) => (
                <Grid container item xs={12} md={6}>
                  <OpportunityCard opp={opp} />
                </Grid>
              ))}
            </Grid>
            <Divider className="w-full my-4" />
            <div className="w-full flex items-center justify-between">
              <Typography className="mt-3" variant="h5" color="textPrimary" gutterBottom>
                - My Engagements
              </Typography>
              <Link href="/engagements">
                <a>
                  View More
                  <FontAwesomeIcon className="ml-2" icon={faAngleRight} />
                </a>
              </Link>
            </div>

            <Grid className="test-cont" container item spacing={2}>
              {comments.map((comm) => (
                <Grid container item xs={12} md={6}>
                  <EngageCard comm={comm} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid container item xs={12} md={3} className="mt-4">
            <Typography className="mt-3" variant="h5" color="textPrimary" gutterBottom>
              - Invitations
            </Typography>
          </Grid>
        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default Home;
