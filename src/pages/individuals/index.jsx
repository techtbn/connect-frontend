import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IndividualCard from 'components/IndividualCard';
import InviteModal from 'components/InviteModal';
import MainLayout from 'components/MainLayout';
import SelectFilter from 'components/SelectFilter';
import { individualTypes } from 'configs/individuals';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

const qs = require('qs');

const IndividualsList = () => {
  const [indv, setIndv] = useState(null);
  const [extypes, setExtypes] = useState([]);
  const [commitment, setCommitment] = useState([]);
  const [search, setSearch] = useState('');
  const [debSearch] = useDebounce(search, 1000);

  const { authToken } = useContext(userContext);

  const jformat = qs.stringify({
    extypes,
    commitment,
    search: debSearch
  }, { indices: false });

  let expOpts = [];
  let expMap = {};
  const expQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (expQuery.data) {
    expOpts = expQuery.data.map((exp) => ({ label: exp.name, value: exp.slug }));
    expMap = Object.fromEntries(expQuery.data.map((exp) => [exp.slug, exp.name]));
  }

  let users = [];
  const usersQuery = useSWR(
    ['funders', extypes, commitment, debSearch],
    () => apiList('/users/', jformat, authToken)
  );

  if (usersQuery.data) {
    users = usersQuery.data;
  }
  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Individuals
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={3} className="mt-4" order={{ xs: 2, md: 1 }}>
            <SelectFilter name="Commitment" olist={individualTypes} opts={commitment} setOpts={setCommitment} circles />
          </Grid>
          <Grid container item xs={12} md={3} className="mt-4" order={{ xs: 3, md: 2 }}>
            <SelectFilter name="Expertise" olist={expOpts} opts={extypes} setOpts={setExtypes} />
          </Grid>
          <Grid container item xs={12} md={3} order={{ xs: 1, md: 3 }}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              label="Search Individuals"
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
          {users.length
            ? (
              users.map((user) => (
                <Grid container item xs={12} md={6} key={user.id}>
                  <IndividualCard user={user} expMap={expMap} setIndv={setIndv} />
                </Grid>
              ))
            )
            : (
              <div className="w-full mt-8 text-center">
                <Typography gutterBottom variant="h4" component="div">
                  <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  <br />
                  No Individuals Found
                </Typography>
              </div>
            )}

        </Grid>
      </Grid>
      {indv
        ? <InviteModal indv={indv} setIndv={setIndv} />
        : null}
    </MainLayout>
  );
};

export default IndividualsList;
