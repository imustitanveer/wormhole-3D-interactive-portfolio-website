import Image from "next/image";

type CircleImageProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  inset?: "none" | "sm" | "md";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const sizeClasses: Record<NonNullable<CircleImageProps["size"]>, string> = {
  sm: "size-11 md:size-14",
  md: "size-16",
  lg: "size-24",
  xl: "size-24 sm:size-28 xl:size-32",
};

const insetClasses: Record<NonNullable<CircleImageProps["inset"]>, string> = {
  none: "inset-0",
  sm: "inset-[6%]",
  md: "inset-[12%]",
};

const imageSizes: Record<NonNullable<CircleImageProps["size"]>, string> = {
  sm: "(min-width: 768px) 56px, 44px",
  md: "64px",
  lg: "96px",
  xl: "(min-width: 1280px) 128px, (min-width: 640px) 112px, 96px",
};

export function CircleImage({
  src,
  alt,
  size = "md",
  inset = "md",
  className = "",
  imageClassName = "object-contain",
  priority = false,
}: CircleImageProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-white/15 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.22)] ${sizeClasses[size]} ${className}`}
    >
      <div className={`absolute ${insetClasses[inset]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes[size]}
          className={imageClassName}
          priority={priority}
        />
      </div>
    </div>
  );
}
