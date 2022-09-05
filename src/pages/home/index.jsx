/* eslint-disable */
import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainLayout from 'components/MainLayout';
import OrgCard from 'components/OrgCard';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';

const qs = require('qs');

const Home = () => {
  const { authToken, user } = useContext(userContext);

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        {`Welcome ${user.first_name}`}
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={3} className="mt-4">
            <p>Test</p>
          </Grid>
          <Grid container item xs={12} md={3} className="mt-4">
            <p>Profile</p>
          </Grid>
        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default Home;
