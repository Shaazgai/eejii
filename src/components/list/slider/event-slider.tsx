import type { EmblaCarouselType } from 'embla-carousel-react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { EventType } from '@/lib/types';

import EventCard from '../../card/event-card';
import { DotButton } from './slider-button-dots';

const EventSlider = ({
  events,
  isEventLoading,
}: {
  events: EventType[];
  isEventLoading: boolean;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    containScroll: 'trimSnaps',
    // align: 'center',
    loop: true,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);
  return (
    <>
      <div className="">
        <div className="mx-6 flex items-center justify-between">
          <h3 className="text-2xl">Events</h3>
          <div className="flex gap-2">
            <Button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              variant={'secondary'}
            >
              <ArrowLeft />
            </Button>
            <Button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              variant={'secondary'}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="embla">
          <div className="embla__viewport w-[1300px]" ref={emblaRef}>
            <div className="embla__container">
              {!isEventLoading &&
                events &&
                events.slice(0, 6).map(event => {
                  return (
                    <div className="embla__slide" key={event.id}>
                      <EventCard event={event as EventType} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="embla__dots ">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </>
  );
};

export default EventSlider;
