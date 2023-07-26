import type { JoinRequestTableProps, JRNGrantProps } from '@/lib/types';

export function normalizeGrantJoinRequest(data: JRNGrantProps[]) {
  const result: JoinRequestTableProps[] = [];

  data.forEach(grant => {
    const arrPar: JoinRequestTableProps[] =
      grant?.GrantFundraisingPartner?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role || '',
          type: item.type || '',
          projectTitle: grant?.title || '',
          projectId: grant?.id || '',
          userEmail: item.Partner?.email || '',
          userId: item.Partner?.id || '',
          userType: 'partner',
          userPhoneNumbers: item.Partner?.phoneNumbers || null,
        };
      }) || [];
    const arrSupp: JoinRequestTableProps[] =
      grant?.GrantFundraisingSupporter?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role,
          type: item.type || '',
          projectTitle: grant.title || '',
          projectId: grant.id || '',
          userEmail: item.Supporter?.email || '',
          userId: item.Supporter?.id || '',
          userType: 'supporter',
          userPhoneNumbers: item.Supporter?.phoneNumbers || null,
        };
      }) || [];
    result.push(...arrPar, ...arrSupp); // Concatenate both arrays and push to the result array.
  });

  console.log(result);
  return result;
}
