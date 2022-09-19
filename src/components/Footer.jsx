import { faFacebookF, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Footer = () => (
  <footer className="bg-gray-200">
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography className="mb-4" variant="h6" color="textPrimary" gutterBottom>
            Transformational Business Network Asia (TBN Asia)
          </Typography>
          <p>Mailing address: 140 Paya Lebar Road, #10-09 AZ @ Paya Lebar, Singapore 409015</p>
          <p>Email address: info@tbn.asia</p>
        </Grid>
        <Divider className="w-full md:hidden my-4" />
        <Grid className="md:text-right" item xs={12} md={4}>
          <a href="https://tbn.us15.list-manage.com/subscribe?id=635e30fd78&u=2fbfbc82ef502260f29a2cc77">
            <FontAwesomeIcon className="mr-2" icon={faEnvelope} />
            Join our mailing list
          </a>
          <div className="mt-4">
            <a href="https://www.linkedin.com/company/tbn-asia/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon size="xl" className="mr-4" icon={faLinkedin} fixedWidth />
            </a>
            <a href="https://www.facebook.com/tbnasia" target="_blank" rel="noreferrer">
              <FontAwesomeIcon size="xl" className="mr-4" icon={faFacebookF} fixedWidth />
            </a>
            <a href="https://www.instagram.com/tbnasia/" target="_blank" rel="noreferrer">
              <FontAwesomeIcon size="xl" className="mr-4" icon={faInstagram} fixedWidth />
            </a>
            <a href="mailto:info@tbn.asia" target="_blank" rel="noreferrer">
              <FontAwesomeIcon size="xl" className="" icon={faEnvelope} fixedWidth />
            </a>
          </div>
        </Grid>
      </Grid>
    </Container>
  </footer>
);

export default Footer;
