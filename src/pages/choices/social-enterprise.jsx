/* eslint-disable react/no-unescaped-entities */
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const SocialEnterprise = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
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
        <Typography variant="h4" component="div">
          Just a little more information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Your Organization's Misson"
            name="misson"
            multiline
            autoFocus
          />
          <Divider className="my-2">
            <Typography variant="h5" component="div">
              I need help with
            </Typography>
          </Divider>
          <p>
            Enter your most pressing needs.
            <br />
            You'll be update them in your profile later.
          </p>
          <TextField
            margin="normal"
            required
            fullWidth
            label="My first need"
            name="misson"
            multiline
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="My second need"
            name="misson"
            multiline
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="My third need"
            name="misson"
            multiline
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </div>
    </Box>
  );
};

export default SocialEnterprise;
