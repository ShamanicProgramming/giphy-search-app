import React, { useState, useCallback, useEffect } from 'react'

const PLACEHOLDER_SRC = `data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D`

type PropType = {
    imgSrc: string
}

export const LazyLoadImage: React.FC<PropType> = (props) => {
    const { imgSrc } = props
    const [hasLoaded, setHasLoaded] = useState(false)

    const setLoaded = useCallback(() => {
        setHasLoaded(true)
    }, [setHasLoaded])

    useEffect(() => {
        setHasLoaded(false)
    }, [imgSrc])

    return (
        <div className={'embla__lazy-load'.concat(
            hasLoaded ? ' embla__lazy-load--has-loaded' : ''
        )}>
            {!hasLoaded && <span className="embla__lazy-load__spinner" />}
            <img
                className="embla__slide__img embla__lazy-load__img"
                onLoad={setLoaded}
                src={imgSrc}
                data-src={imgSrc}
            />
        </div>
    )
}
