import '@/styles/globals.css';

import { type AppType } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import { api } from '@/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SessionProvider>
      {/* <SessionContext.Provider value={{ user }}> */}
      <Component {...pageProps} />
      {/* </SessionContext.Provider> */}
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
