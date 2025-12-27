"use client";

import { useState } from "react";
import Image from "next/image";

interface UnitImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function UnitImage({ src, alt, fill, className, priority, sizes }: UnitImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  // Default sizes for common use cases: thumbnails and detail pages
  const defaultSizes = fill
    ? "(max-width: 640px) 64px, (max-width: 768px) 80px, 128px"
    : undefined;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes || defaultSizes}
      onError={() => setImgSrc("/placeholder-unit.svg")}
    />
  );
}
