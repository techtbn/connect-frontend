import { faExclamationTriangle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MainLayout from 'components/MainLayout';
import OpportunityCard from 'components/OpportunityCard';
import OrgJumbotron from 'components/OrgJumbotron';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { apiGet, apiList } from 'services/api';
import useSWR from 'swr';

const qs = require('qs');

const OrgView = () => {
  const router = useRouter();
  const { id } = router.query;
  const { authToken } = useContext(userContext);

  let org = {};
  const orgQuery = useSWR(
    id ? ['org-view', id] : null,
    () => apiGet(`/orgs/${id}/`, authToken)
  );

  if (orgQuery.data) {
    org = orgQuery.data;
  }

  const jformat = qs.stringify({
    org: id
  });

  let opps = [];
  const oppsQuery = useSWR(
    id ? ['org-opps', id] : null,
    () => apiList('/opportunities/', jformat, authToken)
  );

  if (oppsQuery.data) {
    opps = oppsQuery.data;
  }

  return (
    <MainLayout>
      <OrgJumbotron org={org} />
      <Divider>
        <Typography className="my-4" variant="h3">Opportunities</Typography>
      </Divider>
      <Grid container item spacing={2} className="mt-1">
        {opps.length
          ? (
            opps.map((opp) => (
              <Grid container item xs={12} md={4}>
                <OpportunityCard opp={opp} />
              </Grid>
            ))
          )
          : (
            <div className="w-full mt-8 text-center">
              <Typography gutterBottom variant="h4" component="div">
                <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                <br />
                No Opportunities Found
              </Typography>
            </div>
          )}

      </Grid>
    </MainLayout>
  );
};

export default OrgView;
