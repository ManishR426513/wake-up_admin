import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { handleMedia } from "@/helper/helper";
import { mediaViewerProps } from "./allInterface";

export function MediaViewer({ viewMedia, setviewMedia }: mediaViewerProps) {
  const handleOpenChange = () => {
    setviewMedia({ open: false, media: [] });
  };

  return (
    <Dialog open={viewMedia.open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-md p-2 sm:p-4 rounded-lg">
        {viewMedia.media.length > 0 ? (
          <div className="relative w-full">
            <Carousel className="w-full relative">
              <CarouselContent>
                {viewMedia.media.map((item, index) => (
                  <CarouselItem
                    key={index}
                    className="flex justify-center items-center"
                  >
                    <div className="max-h-[60vh] w-full flex justify-center items-center">
                      {item.mediaType === "IMAGE" ? (
                        <img
                          src={handleMedia(item.url)}
                          alt={`media-${index}`}
                          className="object-contain max-h-[60vh] w-full rounded-md"
                        />
                      ) : item.mediaType === "VIDEO" ? (
                        <video
                          controls
                          src={handleMedia(item.url)}
                          className="max-h-[60vh] w-full rounded-md"
                        />
                      ) : null}
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                <CarouselPrevious />
              </div>
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                <CarouselNext />
              </div>
            </Carousel>
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-sm">
            No media available
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
