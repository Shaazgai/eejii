declare module '@/env.mjs' {
  const env: {
    NODE_ENV: string;
    DATABASE_URL: string;
    NEXTAUTH_SECRET: string;
  };

  export default env;
}
