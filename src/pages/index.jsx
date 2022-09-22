import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { userContext } from 'contexts/Auth';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';

const SignInSide = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  const {
    isAuth, user, login, loginWithLinkedIn
  } = useContext(userContext);

  const { linkedInLogin } = useLinkedIn({
    clientId: '86lrg0924nh0k2',
    redirectUri: `${typeof window === 'object' && window.location.origin}/linkedin`,
    scope: 'r_liteprofile r_emailaddress',
    onSuccess: async (code) => {
      loginWithLinkedIn({ code });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    login(data, setDisabled);
  };

  useEffect(() => {
    if (isAuth) {
      let route = '/home';
      if (!user.initial) {
        route = '/choices';
      }
      router.push(route);
    }
  }, [isAuth]);

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
          <img className="w-40 mb-8" src="/logo.png" alt="" />
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Button
            className="text-white px-4 my-4"
            sx={{
              '&:hover': {
                backgroundColor: '#338ec1'
              },
              backgroundColor: '#0072b1'
            }}
            onClick={linkedInLogin}
          >
            <FontAwesomeIcon className="mr-2" icon={faLinkedin} />
            Sign In with LinkedIn
          </Button>

          <Divider className="w-11/12">or</Divider>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={disabled}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register">
                  {'Don\'t have an account? Sign Up'}
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

export default SignInSide;
