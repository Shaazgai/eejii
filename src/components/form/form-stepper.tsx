import { Badge, Divider } from '@mantine/core';

export const FormStep = ({ step, line }: { step: number; line?: boolean }) => {
  return (
    <div className="w-[35px]">
      <Badge
        radius={'xl'}
        w={35}
        className="outline outline-8 outline-white"
        h={35}
        styles={{ label: { fontWeight: 500, fontSize: 18 } }}
      >
        {step}
      </Badge>
      {line && (
        <Divider
          h={'100%'}
          size={'sm'}
          orientation="vertical"
          mx={'auto'}
          w={1}
        />
      )}
    </div>
  );
};
