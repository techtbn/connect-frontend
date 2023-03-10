import PropTypes from 'prop-types';

import Footer from './Footer';
import MainHeader from './MainHeader';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div>
      <MainHeader />
      <div className="container mx-auto 2xl:max-w-screen-xl mb-8">
        {children}
      </div>
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
