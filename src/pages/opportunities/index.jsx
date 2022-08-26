import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MainLayout from 'components/MainLayout';
import OpportunityCard from 'components/OpportunityCard';
import SelectFilter from 'components/SelectFilter';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

const qs = require('qs');

const OpportunityView = () => {
  const [extypes, setExtypes] = useState([]);
  const [search, setSearch] = useState('');
  const [debSearch] = useDebounce(search, 1000);

  const { authToken } = useContext(userContext);

  let expOpts = [];
  const indsQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (indsQuery.data) {
    expOpts = indsQuery.data.map((ind) => ({ label: ind.name, value: ind.slug }));
  }

  const jformat = qs.stringify({
    extypes,
    search: debSearch
  }, { indices: false });

  let opps = {};
  const oppQuery = useSWR(
    ['opps', extypes, debSearch],
    () => apiList('/opportunities/', jformat, authToken)
  );

  if (oppQuery.data) {
    opps = oppQuery.data;
  }

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Opportunities
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={3} className="mt-4">
            <SelectFilter name="Expertise" olist={expOpts} opts={extypes} setOpts={setExtypes} />
          </Grid>
          <Grid container item xs={12} md={3}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              label="Search Funders"
              name="misson"
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FontAwesomeIcon icon={faSearch} />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        <Grid className="test-cont" container item spacing={2}>
          {opps.length
            ? (
              opps.map((opp) => (
                <Grid container item xs={12} md={6}>
                  <OpportunityCard opp={opp} />
                </Grid>
              ))
            )
            : (
              <div className="w-full mt-8 text-center">
                <Typography gutterBottom variant="h4" component="div">
                  <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  <br />
                  No Funders Found
                </Typography>
              </div>
            )}

        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default OpportunityView;
