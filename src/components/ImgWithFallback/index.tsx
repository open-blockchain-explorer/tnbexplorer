import React, {FC, HTMLProps} from 'react';

interface ComponentProps {
  fallback: string;
}

export const ImgWithFallback: FC<ComponentProps & HTMLProps<HTMLImageElement>> = ({
  src,
  fallback,
  type = 'image/webp',
  alt,
}) => (
  <picture>
    <source srcSet={src} type={type} />
    <img src={fallback} alt={alt} />
  </picture>
);
