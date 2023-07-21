import type { JoinRequestTableProps, JRNEventProps } from '@/lib/types';

export function normalizeEventJoinRequest(data: JRNEventProps[]) {
  const result: JoinRequestTableProps[] = [];

  data.forEach(event => {
    const arrPar: JoinRequestTableProps[] =
      event?.EventPartner?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role,
          type: item.type || '',
          projectTitle: event?.title || '',
          projectId: event?.id || '',
          userEmail: item.Partner?.email || '',
          userId: item.Partner?.id || '',
          userType: 'partner',
          userName: item.Partner?.organization,
          userPhoneNumbers: item.Partner?.phoneNumbers || null,
        };
      }) || [];
    const arrSupp: JoinRequestTableProps[] =
      event?.EventSupporter?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role,
          type: item.type || '',
          projectTitle: event.title || '',
          projectId: event.id || '',
          userEmail: item.Supporter?.email || '',
          userName: item.Supporter?.organization || '',
          userId: item.Supporter?.id || '',
          userType: 'supporter',
          userPhoneNumbers: item.Supporter?.phoneNumbers || null,
        };
      }) || [];

    const arrVol: JoinRequestTableProps[] =
      event?.EventVolunteer?.map(item => {
        return {
          requestId: item.id,
          status: item.status,
          createdAt: item.createdAt,
          role: item.role,
          type: item.type || '',
          projectTitle: event.title || '',
          projectId: event.id || '',
          userEmail: item.Volunteer?.email || '',
          userName:
            `${item.Volunteer?.firstName} " " ${item.Volunteer?.lastName}` ||
            '',
          userId: item.Volunteer?.id || '',
          userType: 'volunteer',
          userPhoneNumbers: item.Volunteer?.phoneNumbers || null,
        };
      }) || [];
    result.push(...arrPar, ...arrSupp, ...arrVol); // Concatenate both arrays and push to the result array.
  });

  console.log(result);
  return result;
}
