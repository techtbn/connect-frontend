/* eslint-disable */
import { faExclamationTriangle, faSearch } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import EngageCard from 'components/EngageCard';
import EngageDrawer from 'components/EngageDrawer';
import MainLayout from 'components/MainLayout';
import SelectFilter from 'components/SelectFilter';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';
import { useDebounce } from 'use-debounce';

const qs = require('qs');

const EngagementView = () => {
  const [engage, setEngage] = useState(null);

  const [search, setSearch] = useState('');
  const [debSearch] = useDebounce(search, 1000);

  const { authToken } = useContext(userContext);

  const jformat = qs.stringify({
    search: debSearch
  }, { indices: false });

  let comments = [];
  const commentsQuery = useSWR(
    ['comments', debSearch],
    () => apiList('/comments/', jformat, authToken)
  );

  if (commentsQuery.data) {
    comments = commentsQuery.data;
  }

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Engagements
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        <Grid container item xs={12} spacing={2} className="justify-end">
          <Grid container item xs={12} md={3}>
            <TextField
              margin="normal"
              size="small"
              required
              fullWidth
              label="Search Engagements"
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
          {comments.length
            ? (
              comments.map((comm) => (
                <Grid container item key={comm.id}>
                  <EngageCard comm={comm} setEngage={setEngage} />
                </Grid>
              ))
            )
            : (
              <div className="w-full mt-8 text-center">
                <Typography gutterBottom variant="h4" component="div">
                  <FontAwesomeIcon icon={faExclamationTriangle} size="2x" />
                  <br />
                  No Engagements
                </Typography>
              </div>
            )}

        </Grid>
      </Grid>
      {engage
        ? <EngageDrawer engage={engage} setEngage={setEngage} />
        : null}
    </MainLayout>
  );
};

export default EngagementView;
