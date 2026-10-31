import Image from "next/image";
import type { Media as MediaType } from "@/content/types";
import { Video } from "./Video";

type Props = {
  media: MediaType;
  sizes: string;
  mode?: "preview" | "full";
  priority?: boolean;
  className?: string;
};

/** Renderiza imagem ou vídeo a partir do modelo de conteúdo. */
export function Media({ media, sizes, mode = "preview", priority, className }: Props) {
  if (media.kind === "video") {
    return <Video media={media} mode={mode} sizes={sizes} priority={priority} className={className} />;
  }
  return (
    <span className={["frame", className].filter(Boolean).join(" ")} style={{ aspectRatio: `${media.width} / ${media.height}` }}>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes={sizes}
        quality={85}
        priority={priority}
      />
    </span>
  );
}
