import React, { useState, useEffect, useCallback } from "react"
import { EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import "./CarouselThumbs.scss"

type EmblaGenericProps = {
  slides: any[]
  options?: EmblaOptionsType

  renderMain: (item: any, index: number, selected: boolean) => React.ReactNode
  renderThumb: (
    item: any,
    index: number,
    selected: boolean,
    onSelect: (targetIndex?: number) => void
  ) => React.ReactNode
}

const CarouselThumbs: React.FC<EmblaGenericProps> = ({
  slides,
  options,
  renderMain,
  renderThumb
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    const snap = emblaMainApi.selectedScrollSnap()
    setSelectedIndex(snap)
    emblaThumbsApi.scrollTo(snap)
  }, [emblaMainApi, emblaThumbsApi])

  useEffect(() => {
    if (!emblaMainApi) return
    emblaMainApi.on("select", onSelect)
    emblaMainApi.on("reInit", onSelect)
    onSelect()
  }, [emblaMainApi, onSelect])


  return (
    <div className="carouselThumbs">

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides.map((item, index) => {
              const isSelected = selectedIndex === index
              const handleSelect = (targetIndex = index) =>
              emblaMainApi?.scrollTo(targetIndex);

              return (
                <div
                  key={index}
                  className={`embla-thumbs__slide ${isSelected ? "is-selected" : ""}`}
                >
                  {renderThumb(item, index, isSelected, handleSelect)}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="carouselThumbs___viewport" ref={emblaMainRef}>
        <div className="carouselThumbs___container">
          {slides.map((item, index) => (
            <div className="carouselThumbs___slide" key={index}>
              {renderMain(item, index, selectedIndex === index)}
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default CarouselThumbs