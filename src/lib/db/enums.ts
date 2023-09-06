export const Role = {
  ROLE_USER: 'ROLE_USER',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
} as const;
export type Role = (typeof Role)[keyof typeof Role];
export const UserType = {
  USER_VOLUNTEER: 'USER_VOLUNTEER',
  USER_PARTNER: 'USER_PARTNER',
  USER_SUPPORTER: 'USER_SUPPORTER',
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];
export const RequestType = {
  REQUEST_PENDING: 'REQUEST_PENDING',
  REQUEST_DENIED: 'REQUEST_DENIED',
  REQUEST_APPROVED: 'REQUEST_APPROVED',
} as const;
export type RequestType = (typeof RequestType)[keyof typeof RequestType];
