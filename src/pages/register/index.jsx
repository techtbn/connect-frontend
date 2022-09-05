import { faEye, faEyeSlash, faUser } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

const Register = () => {
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    showPassword: false
  });

  const router = useRouter();
  const { register } = useContext(userContext);

  const handleChange = (field, val) => {
    setValues({ ...values, [field]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(values, router, setDisabled);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/harvest.jpeg")',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <FontAwesomeIcon icon={faUser} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.email}
              onChange={(e) => handleChange('email', e.target.value)}
              name="email"
              label="Email"
              type="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              name="first_name"
              label="First Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              name="last_name"
              label="Last Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={values.org}
              onChange={(e) => handleChange('org', e.target.value)}
              name="org"
              label="Organization"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password1"
              label="Password"
              type={values.showPassword ? '' : 'password'}
              value={values.password1}
              onChange={(e) => handleChange('password1', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleChange('showPassword', !values.showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      <FontAwesomeIcon icon={values.showPassword ? faEye : faEyeSlash} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  Back to Login
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
              {'Copyright © '}
              <Link color="inherit" href="https://mui.com/">
                TBN ASIA
              </Link>
              {' '}
              {new Date().getFullYear()}
              .
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
