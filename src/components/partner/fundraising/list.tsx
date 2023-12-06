import type { Fundraising } from '@/lib/db/types';
import type { FundWithOwner } from '@/lib/types';
import { SimpleGrid, Skeleton } from '@mantine/core';
import { FundraisingCard } from './card';

export const FundraisingListPrivate = ({
  fundraisings,
  isLoading,
}: {
  fundraisings: FundWithOwner[] | undefined;
  isLoading: boolean;
}) => {
  return (
    <>
      {!isLoading ? (
        <SimpleGrid spacing={20}>
          {fundraisings && fundraisings.length > 0
            ? fundraisings?.map((item, i) => (
                <FundraisingCard
                  key={i}
                  fundraising={item as unknown as Fundraising}
                />
              ))
            : 'No fundraisings'}
        </SimpleGrid>
      ) : (
        <SimpleGrid>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={100} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
