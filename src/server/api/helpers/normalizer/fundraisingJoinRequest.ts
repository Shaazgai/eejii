import type { JoinRequestTableProps, JRNFundraisingProps } from '@/lib/types';

export function normalizeFundraisingJoinRequest(
  data: Partial<JRNFundraisingProps>[]
) {
  const result: JoinRequestTableProps[] = [];

  data.forEach(fundraising => {
    const arrPar: JoinRequestTableProps[] =
      fundraising?.FundraisingPartner?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role || '',
          type: item.type || '',
          projectTitle: fundraising?.title || '',
          projectId: fundraising?.id || '',
          userEmail: item.Partner?.email || '',
          userId: item.Partner?.id || '',
          userType: 'partner',
          userPhoneNumbers: item.Partner?.phoneNumbers || null,
        };
      }) || [];
    const arrSupp: JoinRequestTableProps[] =
      fundraising?.FundraisingSupporter?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role,
          type: item.type || '',
          projectTitle: fundraising.title || '',
          projectId: fundraising.id || '',
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
