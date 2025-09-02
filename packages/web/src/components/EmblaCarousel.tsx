import React, { useState, useEffect, useCallback } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import { LazyLoadImage } from './EmblaCarouselLazyLoadImage'

type PropType = {
    slides: { index: number, imgUrl: string, linkUrl: string }[]
    options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides: slides, options } = props
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi || !emblaThumbsApi) return
            emblaMainApi.scrollTo(index)
        },
        [emblaMainApi, emblaThumbsApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()

        emblaMainApi.on('select', onSelect).on('reInit', onSelect)
    }, [emblaMainApi, onSelect])

    useEffect(() => {
        if (!emblaMainApi) return
        emblaMainApi.scrollTo(0)
    }, [slides])

    return (
        <div className="embla" >
            <div className="embla__viewport" ref={emblaMainRef} >
                <div className="embla__container" >
                    {
                        slides.map((slide) => (
                            <div className="embla__slide" key={slide.index} >
                                <LazyLoadImage imgSrc={slide.imgUrl} />
                                <a href={slide.linkUrl} className="embla__slide__link">{slide.linkUrl}</a>
                            </div>
                        ))}
                </div>
            </div>

            < div className="embla-thumbs" >
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef} >
                    <div className="embla-thumbs__container" >
                        {
                            slides.map((slide) => (
                                <Thumb
                                    key={slide.index}
                                    onClick={() => onThumbClick(slide.index)}
                                    selected={slide.index === selectedIndex}
                                    imgUrl={slide.imgUrl}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmblaCarousel
