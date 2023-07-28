// import NoImage from '@public/images/placeholder.webp';
import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string;
}
export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc || '/images/placeholder.webp'}
      onError={() => {
        setImgSrc('/images/placeholder.webp');
      }}
    />
  );
};
