export const Role = {
  ROLE_USER: 'ROLE_USER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];
