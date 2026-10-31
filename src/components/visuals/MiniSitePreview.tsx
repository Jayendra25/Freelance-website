import type { PreviewVariant } from "@/lib/types";

import { CafePreview } from "./previews/CafePreview";
import { GymPreview } from "./previews/GymPreview";
import { HotelPreview } from "./previews/HotelPreview";

type MiniSitePreviewProps = {
  variant: PreviewVariant;
  priority?: boolean;
};

export function MiniSitePreview({ variant, priority = false }: MiniSitePreviewProps) {
  switch (variant) {
    case "cafe":
      return <CafePreview priority={priority} />;
    case "hotel":
      return <HotelPreview priority={priority} />;
    case "gym":
      return <GymPreview priority={priority} />;
  }
}
