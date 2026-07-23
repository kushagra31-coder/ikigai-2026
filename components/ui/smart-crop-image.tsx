"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import smartcrop from "smartcrop";

const focalCache = new Map<string, { x: string; y: string; scale: number }>();

export function SmartCropImage({ src, alt, className, sizes }: { src: string; alt: string; className?: string, sizes?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cropStyle, setCropStyle] = useState<{ objectPosition: string; transform: string } | null>(null);

  useEffect(() => {
    if (focalCache.has(src)) {
      const cached = focalCache.get(src)!;
      setCropStyle({
        objectPosition: `${cached.x} ${cached.y}`,
        transform: `scale(${cached.scale})`,
      });
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (focalCache.has(src)) {
      setIsLoaded(true);
      return;
    }
    const img = e.target as HTMLImageElement;
    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    if (nw < 50 || nh < 50) {
      setIsLoaded(true);
      return;
    }
    try {
      const result = await smartcrop.crop(img, { width: 400, height: 400 });
      const crop = result.topCrop;
      const cx = crop.x + crop.width / 2;
      let cy = crop.y + crop.height / 2;
      // Preserve forehead to prevent top-clipping on small circular/portrait avatars
      cy = Math.max(0, cy - crop.height * 0.20); 
      const px = (cx / nw) * 100;
      const py = (cy / nh) * 100;
      const styleData = { x: `${px.toFixed(1)}%`, y: `${py.toFixed(1)}%`, scale: 1.05 };
      focalCache.set(src, styleData);
      setCropStyle({
        objectPosition: `${styleData.x} ${styleData.y}`,
        transform: `scale(${styleData.scale})`,
      });
      setIsLoaded(true);
    } catch (err) {
      setIsLoaded(true);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={100}
      sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
      style={
        cropStyle
          ? {
              objectFit: "cover",
              objectPosition: cropStyle.objectPosition,
              transform: cropStyle.transform,
            }
          : { objectFit: "cover", objectPosition: "top" }
      }
      className={`transition-opacity duration-500 ${className || ""} ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      onLoad={handleLoad}
    />
  );
}
