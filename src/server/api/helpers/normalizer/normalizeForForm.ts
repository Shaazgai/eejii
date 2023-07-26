import type { ContactType, EventType, FundraisingType } from '@/lib/types';

export function normalizeEventToForm(data: EventType) {
  const res = {
    title: data.title || '',
    description: data?.description || '',
    location: data?.location || '',
    startTime: data?.startTime || new Date(),
    endTime: data?.endTime || new Date(),
    requiredTime: data?.requiredTime || '',
    primary_phone: (data.contact as ContactType)?.primary_phone || '',
    secondary_phone: (data.contact as ContactType)?.secondary_phone || '',
    roles: (Object.values(data.roles as object) as []) || [],
    mainCategory: data?.CategoryEvent
      ? (data?.CategoryEvent[0]?.Category?.id as string)
      : '',
  };
  return res;
}

export function normalizeFundToForm(data: FundraisingType) {
  const res = {
    title: data?.title || '',
    description: data?.description || '',
    location: data?.location || '',
    startTime: data?.startTime || new Date(),
    endTime: data?.endTime || new Date(),
    primary_phone: (data?.contact as ContactType)?.primary_phone || '',
    secondary_phone: (data?.contact as ContactType)?.secondary_phone || '',
    goalAmount: data?.goalAmount || 0,
    currentAmount: data?.currentAmount || 0,
    email_1: (data?.contact as ContactType)?.email_1 || '',
    email_2: (data?.contact as ContactType)?.email_2 || '',
    mainCategory: data?.CategoryFundraising
      ? (data?.CategoryFundraising[0]?.Category?.id as string)
      : '',
  };
  return res;
}
