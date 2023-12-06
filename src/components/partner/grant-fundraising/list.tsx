import type { GrantFundraising } from '@/lib/db/types';
import type { GrantFundWithOwner } from '@/lib/types';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { GrantFundraisingCard } from './card';

export const GrantFundraisingListPrivate = ({
  grantFundraisings,
  isLoading,
}: {
  grantFundraisings: GrantFundWithOwner[];
  isLoading: boolean;
}) => {
  return (
    <>
      {!isLoading ? (
        <SimpleGrid spacing={20}>
          {grantFundraisings.map((item, i) => (
            <GrantFundraisingCard
              key={i}
              grantFundraising={item as unknown as GrantFundraising}
            />
          ))}
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
