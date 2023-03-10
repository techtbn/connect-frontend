/* eslint-disable */
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import MainLayout from 'components/MainLayout';
import { seTypes } from 'configs/ses';
import { userContext } from 'contexts/Auth';
import { useContext, useState } from 'react';
import { apiList } from 'services/api';
import useSWR from 'swr';

const OrgProfile = () => {
  const [values, setValues] = useState({});

  const { authToken } = useContext(userContext);

  const onSuccess = (data) => {
    console.log(data);
    if (data.length) {
      setValues(data[0]);
    }
  };

  useSWR(
    ['org-view', 'self'],
    () => apiList('/orgs/', 'otypes=self', authToken, onSuccess)
  );

  let expOpts = [];
  const exQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (exQuery.data) {
    expOpts = exQuery.data;
  }

  const handleChange = (field, val) => {
    setValues({ ...values, [field]: val });
  };

  const handleExpertiseChange = (e) => {
    const {
      target: { value }
    } = e;
    const opts = typeof value === 'string' ? value.split(',') : value;
    setValues({ ...values, 'opp-ex': opts });
  };

  const exMap = Object.fromEntries(expOpts.map((ex) => [ex.slug, ex.name]));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(values).forEach((pair) => {
      formData.append(pair[0], pair[1]);
    });

    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Token ${authToken}` };
    await axios.post(`${BASE_PATH}/orgs/`, formData, { headers });
    setUser({ ...user, initial: true });
    toast.success('Organization saved!');
    router.push('/home');
  };

  return (
    <MainLayout>
      <Typography className="mt-3" variant="h4" color="textPrimary" gutterBottom>
        Edit Organization
      </Typography>
      <Divider />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Grid className="mt-4" container spacing={2}>
          <Grid container item xs={12} md={6}>
            <TextField
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Organization's Name"
              value={values.name || ''}
              shrink
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid container item xs={12} md={6}>
            <TextField
              type="url"
              required
              fullWidth
              label="Website"
              value={values.website || ''}
              shrink
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </Grid>
        </Grid>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Mission"
          multiline
          value={values.mission || ''}
          onChange={(e) => handleChange('mission', e.target.value)}
        />
        <Grid className="py-4" container spacing={2}>
          <Grid container item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
            >
              <FontAwesomeIcon className="mr-2" icon={faCamera} />
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleChange('logo', e.target.files[0])}
              />
            </Button>
            {values.logo
              ? <span className="ml-2">{values.logo.name}</span>
              : null }
          </Grid>
          <Grid container item xs={12} md={6}>
            <Button
              variant="contained"
              component="label"
            >
              <FontAwesomeIcon className="mr-2" icon={faCamera} />
              Upload Banner
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => handleChange('banner', e.target.files[0])}
              />
            </Button>
            {values.banner
              ? <span className="ml-2">{values.banner.name}</span>
              : null }
          </Grid>
        </Grid>
        <Divider className="mt-2">
          <Typography variant="h5" component="div">
            My organization is
          </Typography>
        </Divider>
        <RadioGroup
          value={values.otype}
          onChange={(e) => handleChange('otype', e.target.value)}
        >
          <div className="grid md:grid-cols-3 flex-wrap mt-2">
            {seTypes.map((group) => (
              <div key={group.name}>
                <Box sx={{ backgroundColor: group.color }} className="p-2 h-12 flex items-center justify-center text-white">
                  {group.name}
                </Box>
                {group.children.map((opt) => (
                  <div className="pl-4">
                    <FormControlLabel checked={opt.value === values.otype} value={opt.value} control={<Radio />} label={opt.label} size="small" />
                  </div>
                ))}
              </div>
            ))}

          </div>
        </RadioGroup>
      </Box>
    </MainLayout>
  );
};

export default OrgProfile;
