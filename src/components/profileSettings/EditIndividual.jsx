/* eslint-disable react/no-unescaped-entities */
import { faEye, faEyeSlash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { individualTypes } from 'configs/individuals';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { apiList, apiPut } from 'services/api';
import useSWR from 'swr';

const short = require('short-uuid');

const EditIndividual = (props) => {
  const { puser } = props;

  const [user, setUser] = useState(puser);
  const { authToken } = useContext(userContext);
  const router = useRouter();

  const handleChange = (field, val) => {
    setUser({ ...user, [field]: val });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuser = {
      ...user, initial: true, username: short.generate(), org: ''
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

  console.log(user);

  return (

    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={user.email}
            onChange={(e) => handleChange('email', e.target.value)}
            name="email"
            label="Email"
            type="email"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={user.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            name="first_name"
            label="First Name"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={user.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            name="last_name"
            label="Last Name"
          />
        </Grid>
        <Grid item xs={8}>
          <TextField
            margin="normal"
            required
            fullWidth
            value={user.org}
            onChange={(e) => handleChange('org', e.target.value)}
            name="org"
            label="Organization"
          />
        </Grid>
      </Grid>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password1"
        label="Password"
        type={user.showPassword ? '' : 'password'}
        value={user.password1}
        onChange={(e) => handleChange('password1', e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleChange('showPassword', !user.showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                <FontAwesomeIcon icon={user.showPassword ? faEye : faEyeSlash} />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
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
                    checked={(user.expertise || []).includes(ex.slug)}
                    onChange={(e) => handleChange('expertise',
                      e.target.checked
                        ? [...(user.expertise || []), ex.slug]
                        : user.expertise.filter((vex) => vex !== ex.slug))}
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
                    checked={(user.industries || []).includes(ex.slug)}
                    onChange={(e) => handleChange('industries',
                      e.target.checked
                        ? [...(user.industries || []), ex.slug]
                        : user.industries.filter((vex) => vex !== ex.slug))}
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
      <div>
        <Grid container spacing={2}>
          {individualTypes.map((opt) => (
            <Grid container item xs={12} md={3}>
              
              <FormControlLabel
                control={(
                  <Radio
                    value={opt.value}
                    checked={user.commitment === opt.value}
                    onChange={(e) => handleChange('commitment', e.target.value)}
                  />
                )}
                label={
                  <ListItemText className="text-left md:w-full" primary={opt.label} secondary={opt.extra} />
                    }
                secondary={opt.extra}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </div>

      <TextField
        type="url"
        className="md:max-w-md my-4"
        required
        fullWidth
        label="LinkedIn Profile URL"
        value={user.linkedin}
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
          disabled={!(user.expertise || []).length}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
};

EditIndividual.propTypes = {
  puser: PropTypes.instanceOf(Object).isRequired
};

export default EditIndividual;
