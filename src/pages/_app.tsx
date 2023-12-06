import '@/styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';

import { MantineProvider, createTheme } from '@mantine/core';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

import { api } from '@/utils/api';

interface CustomAppProps extends AppProps {
  pageProps: {
    session?: Session;
  } & AppProps['pageProps'];
}

const theme = createTheme({
  /** Put your mantine theme override here */
});

const CustomApp = ({ Component, pageProps }: CustomAppProps) => {
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(CustomApp);
