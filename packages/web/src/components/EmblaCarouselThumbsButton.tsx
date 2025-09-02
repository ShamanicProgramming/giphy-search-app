import React, { useCallback, useEffect, useState } from 'react'

type PropType = {
    selected: boolean
    imgUrl: string
    onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
    const { selected, imgUrl, onClick } = props
    const [hasLoaded, setHasLoaded] = useState(false)

    const setLoaded = useCallback(() => {
        setHasLoaded(true)
    }, [setHasLoaded])

    useEffect(() => {
        setHasLoaded(false)
    }, [imgUrl])

    return (
        <div className={'embla__lazy-load'.concat(
            hasLoaded ? ' embla__lazy-load--has-loaded' : ''
        )}>
            {!hasLoaded && <span className="embla__lazy-load__spinner" />}
            <div
                className={
                    'embla-thumbs__slide'.concat(
                        selected ? ' embla-thumbs__slide--selected' : ''
                    )
                }
            >
                <img
                    onClick={onClick}
                    className="embla-thumbs__slide__button embla__lazy-load__img"
                    src={imgUrl}
                    onLoad={setLoaded}
                >
                </img>
            </div>
        </div>
    )
}
