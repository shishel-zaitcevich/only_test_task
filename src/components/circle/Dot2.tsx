import * as React from 'react'
import { forwardRef, useRef, useEffect, useState } from 'react'

import { DotsPositionCalculate } from '../utils/dotsPositionCalculate'
import { eventsProp } from '../Types'
import { rotateDotsAroundCenter } from '../utils/rotateDotsAroundCenter'
import { dotOnClickClose } from '../utils/dotOnClickClose'
import { animateDotEnter, animateDotLeave } from '../utils/dotAnimation'
import '../../assets/styles/dotStyles.scss'
import { Interval } from '../intervals/Interval'

interface DotProps {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
  onPageClick: (index: number) => void
  setCircleContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
}

export const Dot: React.FC<DotProps> = forwardRef<HTMLDivElement, DotProps>(
  (
    { data, forwardedRef, onPageClick, setCircleContainerRef }: DotProps,
    ref,
  ) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [dots, setDots] = useState<{ x: number; y: number }[]>([])
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    // const [angleToLastDot, setAngleToLastDot] = useState<number | null>(null) // Добавлено новое состояние
    const circleContainerRef = useRef<HTMLDivElement>(null)

    const dotRefs = useRef<
      Array<React.MutableRefObject<HTMLDivElement | null>>
    >(
      Array(data.length)
        .fill(null)
        .map(() => useRef<HTMLDivElement | null>(null)),
    )

    useEffect(() => {
      setDots(DotsPositionCalculate(data))
    }, [data])

    useEffect(() => {
      setCircleContainerRef(circleContainerRef)
    }, [setCircleContainerRef])

    const { handleDotClick } = dotOnClickClose({
      activeIndex: openIndex,
      setActiveIndex: setOpenIndex,
    })

    const handleActiveDotClick = (openIndex: number) => {
      setOpenIndex(openIndex)
      if (circleContainerRef.current) {
        rotateDotsAroundCenter(
          data,
          circleContainerRef.current,
          openIndex,
          () => onPageClick(openIndex),
          // setAngleToLastDot,
        )
      } else {
        console.error('Circle container not found or not mounted')
      }
    }

    const handleMouseEnter = (index: number) => () => {
      animateDotEnter(index)
      setHoverIndex(index)
    }

    const handleMouseLeave = (index: number) => () => {
      if (openIndex !== index) {
        animateDotLeave(index)
        setHoverIndex(null)
      }
    }

    return (
      <div
        className="circle_container"
        ref={(el) => (circleContainerRef.current = el)}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            ref={(el) => (dotRefs.current[index].current = el)}
            id={`dot-${index}`}
            className={`dot ${openIndex === index ? 'open' : ''}`}
            style={{
              position: 'absolute',
              left: dot.x,
              top: dot.y,
              // transformOrigin: '50% 50%',
              // transform: `rotate(${-angleToLastDot}deg)`, - работает похоже на правду, но тогда сползает положение точек относительно круга
            }}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave(index)}
            onClick={() => {
              handleDotClick(index)
              handleActiveDotClick(index)
            }}
          >
            <div
              className="number"
              style={{
                visibility:
                  hoverIndex === index || openIndex === index
                    ? 'visible'
                    : 'hidden',
              }}
            >
              {data[index].number}
            </div>
            {openIndex === index && (
              <div className="label">{data[index].title}</div>
            )}
          </div>
        ))}
      </div>
    )
  },
)
