import '@/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';

import { api } from '@/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      {/* <SessionContext.Provider value={{ user }}> */}
      <Component {...pageProps} />
      {/* </SessionContext.Provider> */}
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
