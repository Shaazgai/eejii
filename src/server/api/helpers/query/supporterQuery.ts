import type { JRNSupporterProps } from '@/lib/types';

interface InputProps {
  id: string;
  status: string | null;
  projectType: string | null;
  requestType: string | null;
}
export const findGrantRequests = (
  supporter: Partial<JRNSupporterProps>,
  input: Partial<InputProps>
) => {
  return {
    select: {
      id: true,
      title: true,
      GrantFundraisingPartner: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          role: true,
          type: true,
          Partner: {
            select: {
              email: true,
              phoneNumbers: true,
              id: true,
              organization: true,
            },
          },
        },
      },
      GrantFundraisingSupporter: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          role: true,
          type: true,
          Supporter: {
            select: {
              email: true,
              phoneNumbers: true,
              id: true,
              organization: true,
            },
          },
        },
      },
    },
    where: {
      ownerId: supporter.id,
      OR: [
        {
          GrantFundraisingPartner: { some: { type: input.requestType } },
        },
        {
          GrantFundraisingPartner: { some: { type: input.requestType } },
        },
      ],
    },
  };
};
