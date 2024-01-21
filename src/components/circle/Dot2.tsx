import * as React from 'react'
import { forwardRef, useRef, useEffect, useState } from 'react'

import { DotsPositionCalculate } from '../utils/dotsPositionCalculate'
import { eventsProp } from '../Types'
import { rotateDotsAroundCenter } from '../utils/rotateDotsAroundCenter'
import { dotOnClickClose } from '../utils/dotOnClickClose'
import { animateDotEnter, animateDotLeave } from '../utils/dotAnimation'
import '../../assets/styles/dotStyles.scss'

interface DotProps {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
  onPageClick: (index: number) => void
  activePage: number
  // onPaginationClick: () => void
}

export const Dot: React.FC<DotProps> = forwardRef<HTMLDivElement, DotProps>(
  ({ data, forwardedRef, onPageClick, activePage }: DotProps, ref) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null)
    const [dots, setDots] = useState<{ x: number; y: number }[]>([])
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
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

    const { handleDotClick, handleCloseDot } = dotOnClickClose({
      activeIndex: openIndex,
      setActiveIndex: setOpenIndex,
    })

    const handleActiveDotClick = (openIndex: number) => {
      setOpenIndex(openIndex)
      // console.log('circleContainer', circleContainerRef)
      // console.log('circleContainerRef.current', circleContainerRef.current)
      if (circleContainerRef.current) {
        rotateDotsAroundCenter(
          data,
          circleContainerRef.current,
          openIndex,
          // handleDotClick,
          () => onPageClick(openIndex),
        )

        // console.log('openIndex ', openIndex)
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

    // useEffect(() => {
    //   // Проверяем изменение activePage и вызываем rotateDotsAroundCenter при несовпадении
    //   if (openIndex !== null && openIndex !== activePage) {
    //     rotateDotsAroundCenter(
    //       data,
    //       circleContainerRef.current,
    //       openIndex,
    //       () => onPageClick(openIndex),
    //     )
    //   }
    // }, [activePage, openIndex, data, onPageClick])

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
            style={{ position: 'absolute', left: dot.x, top: dot.y }}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave(index)}
            onClick={() => {
              // if (openIndex === index) {
              //   handleCloseDot()
              // } else {
              handleDotClick(index)
              handleActiveDotClick(index)
              // }
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
              <div className="title">{data[index].title}</div>
            )}
          </div>
        ))}
      </div>
    )
  },
)
