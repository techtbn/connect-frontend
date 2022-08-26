import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FunderCard from 'components/FunderCard';
import MainLayout from 'components/MainLayout';
import SelectFilter from 'components/SelectFilter';
import { fundingTypes } from 'configs/partners';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

const qs = require('qs');

const FundersList = () => {
  const [ftypes, setFtypes] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [search, setSearch] = useState('');
  const [debSearch] = useDebounce(search, 1000);

  const { authToken } = useContext(userContext);

  const jformat = qs.stringify({
    ftypes,
    industries,
    search: debSearch
  }, { indices: false });

  let indOpts = [];
  let indOptsMap = {};
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOpts = indsQuery.data.map((ind) => ({ label: ind.name, value: ind.slug }));
    indOptsMap = Object.fromEntries(indsQuery.data.map((ind) => [ind.slug, ind.name]));
  }

  let funders = [];
  const fundersQuery = useSWR(
    ['funders', ftypes, industries, debSearch],
    () => apiList('/funders/', jformat, authToken)
  );

  if (fundersQuery.data) {
    funders = fundersQuery.data;
  }
  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Funders
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={3} className="mt-4">
            <SelectFilter name="Funding Types" olist={fundingTypes} opts={ftypes} setOpts={setFtypes} circles />
          </Grid>
          <Grid container item xs={12} md={3} className="mt-4">
            <SelectFilter name="Industries" olist={indOpts} opts={industries} setOpts={setIndustries} />
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
          {funders.length
            ? (
              funders.map((funder) => (
                <Grid container item xs={12} md={6}>
                  <FunderCard funder={funder} indOptsMap={indOptsMap} />
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

export default FundersList;
