import type { JRNPartnerProps } from '@/lib/types';

interface InputProps {
  requestType: string | null;
  projectType: string | null;
  status: string | null;
}
export const findEventJoinRequests = (
  partner: JRNPartnerProps,
  input: Partial<InputProps>
) => {
  return {
    select: {
      id: true,
      title: true,
      EventPartner: {
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
      EventSupporter: {
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
      EventVolunteer: {
        select: {
          id: true,
          status: true,
          createdAt: true,
          role: true,
          type: true,
          Volunteer: {
            select: {
              firstName: true,
              lastName: true,
              id: true,
              email: true,
              phoneNumbers: true,
            },
          },
        },
      },
    },
    where: {
      ownerId: partner.id,
      OR: [
        { EventPartner: { some: { type: input.requestType } } },
        { EventSupporter: { some: { type: input.requestType } } },
        { EventVolunteer: { some: { type: input.requestType } } },
      ],
    },
  };
};

export const findFundraisingJoinRequests = (
  partner: JRNPartnerProps,
  input: Partial<InputProps>
) => {
  return {
    select: {
      id: true,
      title: true,
      FundraisingPartner: {
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
      FundraisingSupporter: {
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
      partnerId: partner.id,
      OR: [
        { FundraisingPartner: { some: { type: input.requestType } } },
        { FundraisingSupporter: { some: { type: input.requestType } } },
      ],
    },
  };
};

export const findGrantJoinRequests = (
  partner: JRNPartnerProps,
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
      ownerId: partner.id,
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
