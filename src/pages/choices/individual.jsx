/* eslint-disable react/no-unescaped-entities */
import { faAngleLeft } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { individualTypes } from 'configs/individuals';
import { userContext } from 'contexts/Auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList, apiPut } from 'services/api';
import useSWR from 'swr';

const short = require('short-uuid');

const Individual = () => {
  const [values, setValues] = useState({ commitment: 'starter' });
  const { authToken, user, setUser } = useContext(userContext);
  const router = useRouter();

  useEffect(() => {
    if (user.initial) {
      toast.error('You have already created your profile. Please head to your profile to edit it!');
      router.push('/home');
    }
  }, []);

  const handleChange = (field, val) => {
    setValues({ ...values, [field]: val });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuser = {
      ...user, ...values, initial: true, username: short.generate(), org: ''
    };
    await apiPut('/auth/user/', nuser, authToken, () => {});
    setUser(nuser);
    toast.success('Your profile has been updated. Feel free to head over to the opportunities to see how you can help out!');
    router.push('/home');
  };

  let expOpts = [];
  const exQuery = useSWR(
    'expertise',
    () => apiList('/expertise/', '', authToken)
  );

  if (exQuery.data) {
    expOpts = exQuery.data;
  }

  let indOpts = [];
  const indsQuery = useSWR(
    'industries',
    () => apiList('/industries/', '', authToken)
  );

  if (indsQuery.data) {
    indOpts = indsQuery.data;
  }

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <p>
            Enter the expertise you can offer and your level of commitment.
            <br />
            You can update in your profile later.
          </p>
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              I can help with
            </Typography>
          </Divider>
          <FormGroup>
            <Grid container spacing={2}>
              {expOpts.map((ex) => (
                <Grid container item xs={6} md={3}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        name={ex.slug}
                        checked={(values.expertise || []).includes(ex.slug)}
                        onChange={(e) => handleChange('expertise',
                          e.target.checked
                            ? [...(values.expertise || []), ex.slug]
                            : values.expertise.filter((vex) => vex !== ex.slug))}
                      />
                    )}
                    label={ex.name}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              In the following Industries
            </Typography>
          </Divider>
          <FormGroup>
            <Grid container spacing={2}>
              {indOpts.map((ex) => (
                <Grid container item xs={6} md={3}>
                  <FormControlLabel
                    control={(
                      <Checkbox
                        name={ex.slug}
                        checked={(values.industries || []).includes(ex.slug)}
                        onChange={(e) => handleChange('industries',
                          e.target.checked
                            ? [...(values.industries || []), ex.slug]
                            : values.industries.filter((vex) => vex !== ex.slug))}
                      />
                    )}
                    label={ex.name}
                  />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              Which best describes you
            </Typography>
          </Divider>
          <RadioGroup
            value={values.commitment}
            onChange={(e) => handleChange('commitment', e.target.value)}
          >
            <Grid container spacing={2}>
              {individualTypes.map((opt) => (
                <Grid container item xs={12} md={3}>
                  <FormControlLabel
                    value={opt.value}
                    control={<Radio />}
                    label={
                      <ListItemText className="text-left md:w-full" primary={opt.label} secondary={opt.extra} />
                    }
                    secondary={opt.extra}
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
          <TextField
            type="url"
            className="md:max-w-md my-4"
            required
            fullWidth
            label="LinkedIn Profile URL"
            value={values.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="md:max-w-sm"
              sx={{ mt: 3, mb: 2 }}
              disabled={!(values.expertise || []).length}
            >
              Submit
            </Button>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default Individual;
