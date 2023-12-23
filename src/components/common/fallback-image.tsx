// import NoImage from '@public/images/placeholder.webp';
import { Image, Paper } from '@mantine/core';
import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

type FallbackImageProps = ImageProps & {
  fallbackSrc?: string;
  w?: number | string;
  h?: number | string;
  width?: number;
  height?: number;
  radius?: number | string;
  fit?: 'contain' | 'cover';
};
export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  width,
  height,
  w,
  h,
  radius,
  fit,
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Paper
      w={w}
      h={h}
      mah={h}
      maw={w}
      radius={radius}
      style={{ overflow: 'hidden' }}
    >
      <Image
        component={NextImage}
        loading="lazy"
        src={imgSrc}
        radius={radius}
        fit={fit}
        fallbackSrc="/images/placeholder.svg"
        width={width}
        w={w}
        h={h}
        height={height}
        alt="img"
      />
    </Paper>
  );
};
