/* eslint-disable */
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { CacheProvider } from '@emotion/react';
import { config } from '@fortawesome/fontawesome-svg-core';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { UserProvider } from 'contexts/Auth';
import dynamic from 'next/dynamic';
import lightTheme from 'styles/theme/lightTheme';
import createEmotionCache from 'utility/createEmotionCache';

config.autoAddCss = false; /* eslint-disable import/first */

const DynToaster = dynamic(() => import('react-toastify').then((mod) => mod.ToastContainer));
const clientSideEmotionCache = createEmotionCache();

const MatchApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <UserProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <DynToaster />
        </ThemeProvider>
      </CacheProvider>
    </UserProvider>
  );
};

export default MatchApp;
