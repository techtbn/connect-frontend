/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft, faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { fundingTypes } from 'configs/partners';
import { BASE_PATH } from 'constants/site';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList } from 'services/api';
import useSWR from 'swr';

const Funder = () => {
  const { authToken, user, setUser } = useContext(userContext);
  const [values, setValues] = useState({
    name: user.org || ''
  });
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created an organization. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  let indOpts = [];
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOpts = indsQuery.data;
  }

  const handleIndustryChange = (e) => {
    const {
      target: { value }
    } = e;
    const opts = (typeof value === 'string' ? value.split(',') : value);
    setValues({ ...values, industries: opts });
  };

  const inMap = Object.fromEntries(indOpts.map((ind) => [ind.slug, ind.name]));

  const handleVehiclesChange = (e) => {
    const {
      target: { value }
    } = e;
    const opts = (typeof value === 'string' ? value.split(',') : value);
    setValues({ ...values, vehicles: opts });
  };

  const vehMap = Object.fromEntries(fundingTypes.map((ind) => [ind.value, ind.label]));

  const handleChange = (field, val) => {
    setValues({ ...values, [field]: val });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    Object.entries(values).forEach((pair) => {
      formData.append(pair[0], pair[1]);
    });

    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `Token ${authToken}` };
    await axios.post(`${BASE_PATH}/funders/`, formData, { headers });
    setUser({ ...user, initial: true });
    toast.success('Your organization has been added and is pending our review. Our staff will be in contact soon!');
    router.push('/home');
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/sea.jpeg")',
        backgroundSize: 'cover'
      }}
    >
      <div className="bg-white-60 p-8 text-center text-black" style={{ backgroundColor: 'rgba(255,255,255,0.90)' }}>
        <Box className="flex items-center justify-between">
          <div className="w-16 text-left">
            <Link href="/choices">
              <FontAwesomeIcon icon={faAngleLeft} size="xl" />
            </Link>
          </div>
          <Typography className="text-center" variant="h4" component="div">
            Just a little more information
          </Typography>
          <div className="w-16" />
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid container item xs={12} md={6}>
              <TextField
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                label="Organization's Name"
                value={values.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} md={6}>
              <TextField
                type="url"
                required
                fullWidth
                label="Website"
                value={values.website}
                onChange={(e) => handleChange('website', e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Organization's Introduction"
            multiline
            value={values.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          <Grid className="py-4" container spacing={2}>
            <Grid container item xs={12} md={12}>
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
          </Grid>
          <Divider />
          <p>
            Enter the industries you want to invest in and
            <br />
            the manner of which you are doing.
            <br />
            You'll be update them in your profile later.
          </p>
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              I invest in
            </Typography>
          </Divider>
          <FormControl fullWidth>
            <InputLabel>Industries</InputLabel>
            <Select
              multiple
              required
              label="Industries"
              value={values.industries || []}
              renderValue={(selected) => selected.map((sel) => inMap[sel]).join(', ')}
              onChange={handleIndustryChange}
            >
              {indOpts.map((ind) => (
                <MenuItem key={ind.slug} value={ind.slug}>
                  <Checkbox checked={(values.industries || []).includes(ind.slug)} />
                  <ListItemText primary={ind.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              In the following manner
            </Typography>
          </Divider>
          <FormControl fullWidth>
            <InputLabel>Funding Manner</InputLabel>
            <Select
              multiple
              required
              label="Funding Manner"
              value={values.vehicles || []}
              renderValue={(selected) => selected.map((sel) => vehMap[sel]).join(', ')}
              onChange={handleVehiclesChange}
            >
              {fundingTypes.map((ft) => (
                <MenuItem key={ft.value} value={ft.value}>
                  <Checkbox checked={(values.vehicles || []).includes(ft.value)} />
                  <ListItemText primary={ft.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="md:max-w-sm"
              sx={{ mt: 3, mb: 2 }}
              disabled={!(values.industries || []).length && !(values.vehicles || []).length}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Funder;
