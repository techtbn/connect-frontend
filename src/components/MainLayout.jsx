import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Navbar from './Navbar';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div>
      <Navbar />
      <Container
        id="main-cont"
        className="mb-12"
        maxWidth="lg"
      >
        {children}
      </Container>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node // or PropTypes.node.isRequired to make it required
};

MainLayout.defaultProps = {
  children: null
};

export default MainLayout;
