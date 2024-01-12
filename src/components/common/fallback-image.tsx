// import NoImage from '@public/images/placeholder.webp';
import { Image, Paper } from '@mantine/core';
import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

type FallbackImageProps = ImageProps & {
  fallbackSrc?: string;
  fullWidth?: boolean;
  fullHeight?: boolean;
  width: number;
  height: number;
  radius?: number | string;
  fit?: 'contain' | 'cover';
};
export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  width,
  height,
  fullWidth,
  fullHeight,
  radius,
  fit,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Paper
      mah={fullHeight ? '100%' : height}
      maw={fullWidth ? '100%' : width}
      radius={radius}
      style={{ overflow: 'hidden' }}
    >
      <Image
        component={NextImage}
        src={imgSrc}
        radius={radius}
        fit={fit}
        objectPosition="center"
        fallbackSrc="/images/placeholder.svg"
        width={width}
        w={fullWidth ? '100%' : width}
        h={fullHeight ? '100%' : height}
        height={height}
        alt="img"
      />
    </Paper>
  );
};
