import * as React from 'react'
import { forwardRef, useRef, useEffect, useState } from 'react'
import { DotsPositionCalculate } from '../utils/dotsPositionCalculate'
import { eventsProp } from '../Types'
import { rotateDotsAroundCenter } from '../utils/rotateDotsAroundCenter'
import { dotOnClickClose } from '../utils/dotOnClickClose'
import { animateDotEnter, animateDotLeave } from '../utils/dotAnimation'
import { calculateMinAngle } from '../utils/calculateAngleBetweenDots'
import '../../assets/styles/dotStyles.scss'
import { getDotStyles } from '../utils/getDotStyles'

interface DotProps {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
  onPageClick: (index: number) => void
  setCircleContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
  dotRefs: Array<React.MutableRefObject<HTMLDivElement | null>>
}

export const Dot: React.FC<DotProps> = forwardRef<HTMLDivElement, DotProps>(
  (
    {
      data,
      forwardedRef,
      onPageClick,
      setCircleContainerRef,
      dotRefs,
    }: DotProps,
    ref,
  ) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [dots, setDots] = useState<{ x: number; y: number }[]>([])
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const circleContainerRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
      if (openIndex !== null) {
        rotateDotsAroundCenter(
          data,
          circleContainerRef.current,
          openIndex,
          () => {
            onPageClick(openIndex)
          },
          dotRefs,
        )
      }
    }, [openIndex, onPageClick, data])

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

    const lastElementIndex = data.length - 1

    return (
      <div
        className="circle_container"
        ref={(el) => (circleContainerRef.current = el)}
      >
        {dots.map((dot, index) => (
          <div
            key={index}
            ref={(el) => (dotRefs[index].current = el)}
            id={`dot-${index}`}
            className={`dot ${openIndex === index ? 'open' : ''}`}
            style={{
              position: 'absolute',
              left: dot.x,
              top: dot.y,
            }}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave(index)}
            onClick={() => {
              handleDotClick(index)
            }}
          >
            <div
              className="number"
              style={getDotStyles(
                index,
                hoverIndex,
                openIndex,
                lastElementIndex,
                data,
              )}
            >
              {data[index].number}
            </div>
            {openIndex === index && (
              <div
                className="label"
                style={getDotStyles(
                  index,
                  hoverIndex,
                  openIndex,
                  lastElementIndex,
                  data,
                )}
              >
                {data[index].title}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  },
)
