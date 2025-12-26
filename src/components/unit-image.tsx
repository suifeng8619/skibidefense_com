"use client";

import { useState } from "react";
import Image from "next/image";

interface UnitImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function UnitImage({ src, alt, fill, className, priority }: UnitImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      onError={() => setImgSrc("/placeholder-unit.svg")}
    />
  );
}
