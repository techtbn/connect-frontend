/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft, faCamera } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { seTypes } from 'configs/ses';
import { BASE_PATH } from 'constants/site';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList } from 'services/api';
import useSWR from 'swr';

const SocialEnterprise = () => {
  const { user, authToken, setUser } = useContext(userContext);
  const [values, setValues] = useState({
    website: 'https://',
    name: user.org || '',
    otype: 'impact-grants'
  });
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created an organization. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

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
    toast.success("Your organization and it's opportunity has been added. Our members are on it and will reply with their expertise in a bit!");
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
      <div className="bg-white-60 p-8 text-black" style={{ backgroundColor: 'rgba(255,255,255,0.90)' }}>
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
            label="Mission"
            multiline
            value={values.mission}
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
          <div>
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
                        <FormControlLabel value={opt.value} control={<Radio />} label={opt.label} size="small" />
                      </div>
                    ))}
                  </div>
                ))}

              </div>
            </RadioGroup>
          </div>
          <Divider className="mt-2">
            <Typography variant="h5" component="div">
              I need help with
            </Typography>
          </Divider>
          <div className="text-center mb-4">
            <p>
              Enter your first opportunity.
              <br />
              You can update in your profile later.
            </p>
          </div>
          <Grid container spacing={2}>
            <Grid container item xs={12} md={6}>
              <TextField
                required
                fullWidth
                label="Opportunity Name"
                value={values['opp-name']}
                onChange={(e) => handleChange('opp-name', e.target.value)}
              />
            </Grid>
            <Grid container item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Expertise</InputLabel>
                <Select
                  multiple
                  required
                  label="Expertise"
                  value={values['opp-ex'] || []}
                  renderValue={(selected) => selected.map((sel) => exMap[sel]).join(', ')}
                  onChange={handleExpertiseChange}
                >
                  {expOpts.map((ex) => (
                    <MenuItem key={ex.slug} value={ex.slug}>
                      <Checkbox checked={(values['opp-ex'] || []).includes(ex.slug)} />
                      <ListItemText primary={ex.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <TextField
            className="mt-5"
            multiline
            rows={3}
            required
            fullWidth
            label="Details"
            value={values['opp-details']}
            onChange={(e) => handleChange('opp-details', e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default SocialEnterprise;
