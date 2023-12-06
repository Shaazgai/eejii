import type { GrantFundraising } from '@/lib/db/types';
import type { GrantFundWithOwner } from '@/lib/types';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { GrantFundraisingCard } from './card';

export const GrantFundraisingListPrivate = ({
  grantFundraisings,
  isLoading,
}: {
  grantFundraisings: GrantFundWithOwner[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <>
      {!isLoading ? (
        <SimpleGrid spacing={20}>
          {grantFundraisings && grantFundraisings.length > 0
            ? grantFundraisings?.map((item, i) => (
                <GrantFundraisingCard
                  key={i}
                  grantFundraising={item as unknown as GrantFundraising}
                />
              ))
            : 'No grant fundraisings'}
        </SimpleGrid>
      ) : (
        <SimpleGrid>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={40} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
