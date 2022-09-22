import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MainLayout from 'components/MainLayout';
import OrgCard from 'components/OrgCard';
import SideFilter from 'components/SideFilter';
import { seTypes } from 'configs/ses';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

const qs = require('qs');

const OrgList = () => {
  const [opts, setOpts] = useState([]);
  const [search, setSearch] = useState('');
  const [debSearch] = useDebounce(search, 1000);

  const { authToken } = useContext(userContext);

  const jformat = qs.stringify({
    otypes: opts,
    search: debSearch
  }, { indices: false });

  let orgs = [];
  const orgsQuery = useSWR(
    ['orgs', opts, debSearch],
    () => apiList('/orgs/', jformat, authToken)
  );

  if (orgsQuery.data) {
    orgs = orgsQuery.data;
  }
  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Organizations
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            margin="normal"
            size="small"
            required
            fullWidth
            label="Search Enterprises"
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
          <SideFilter name="Impact Spectrum" olist={seTypes} opts={opts} setOpts={setOpts} />
        </Grid>
        <Grid container item xs={12} md={9} spacing={2} className="mt-1">
          {orgs.length
            ? (
              orgs.map((org) => (
                <Grid container item xs={6} md={4}>
                  <OrgCard org={org} />
                </Grid>
              ))
            )
            : (
              <div className="w-full mt-8 text-center">
                <Typography gutterBottom variant="h4" component="div">
                  <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  <br />
                  No Organizations Found
                </Typography>
              </div>
            )}

        </Grid>
      </Grid>

    </MainLayout>
  );
};

export default OrgList;
