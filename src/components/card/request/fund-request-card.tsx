import type { FundraisingType } from '@/lib/types';

const FundRequestCard = ({ fundraising }: { fundraising: FundraisingType }) => {
  return (
    <div className="flex w-full justify-between rounded-md border ">
      <div className="flex">
        <div className="flex items-center justify-center border-r p-4">
          2022.10.10
        </div>
        <div className="flex flex-col p-4">
          <div>{fundraising?.title}</div>
          <div>{fundraising?.description}</div>
        </div>
      </div>
      <div className="flex items-center justify-center p-4">
        {fundraising.partnerId}
        {/* <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => router.push(`/p/manage/${fundraising?.id}`)}
        >
          <ChevronRight />
        </Button> */}
      </div>
    </div>
  );
};

export default FundRequestCard;
