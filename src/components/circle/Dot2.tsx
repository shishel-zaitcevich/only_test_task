import * as React from 'react'
import {
  forwardRef,
  ForwardedRef,
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  useCallback,
} from 'react'

import { DotsPositionCalculate } from '../../utils/dotsPositionCalculate'

import { eventsProp } from '../Types'
import '../../assets/styles/dotStyles.scss'
import { rotateDotsAroundCenter } from '../../utils/rotateDotsAroundCenter'
import { dotOnClickClose } from '../../utils/dotOnClickClose'
import { animateDotEnter, animateDotLeave } from '../../utils/dotMouseAnimation'

interface DotProps {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
}

export const Dot: React.FC<DotProps> = forwardRef<HTMLDivElement, DotProps>(
  ({ data, forwardedRef }: DotProps, ref) => {
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

    // dotRefs.current = Array(data.length)
    //   .fill(null)
    //   .map(() => useRef<HTMLDivElement | null>(null))

    const { handleDotClick, handleCloseDot } = dotOnClickClose({
      activeIndex: openIndex,
      setActiveIndex: setOpenIndex,
    })

    // const handleActiveDotClick = (index: number) => {
    //   setOpenIndex(index)
    // }

    // const onAnimationComplete = useCallback(() => {
    //   // Обнулить активную точку или выполнить другие действия после завершения анимации
    //   if (dotRefs.current[openIndex] && dotRefs.current[openIndex].current) {
    //     dotRefs.current[openIndex].current = null
    //   }
    //   // Сбрасываем openIndex после завершения анимации
    //   setOpenIndex(null)
    //   console.log('setOpenIndex ', openIndex) // openIndex
    // }, [openIndex])

    // const rotateDots = useCallback(() => {
    //   // Используем useCallback для предотвращения пересоздания функции rotateDots
    //   if (circleContainerRef.current !== null && openIndex !== null) {
    //     rotateDotsAroundCenter(
    //       data,
    //       // dotRefs.current.map((ref) => ref.current),
    //       circleContainerRef.current,
    //       openIndex,
    //       onAnimationComplete,
    //     )
    //     console.log('openIndex ', openIndex) // openIndex
    //   }
    // }, [openIndex, data, onAnimationComplete])

    // useEffect(() => {
    //   rotateDots()
    // }, [rotateDots])
    // console.log('openIndex вамфвм ', openIndex) // openIndex

    const onAnimationComplete = (index: number) => {
      if (dotRefs.current[index]) {
        dotRefs.current[index].current = null
        console.log(
          ' dotRefs.current[openIndex || 0].current',
          (dotRefs.current[index].current = null),
        )
      }
    }

    const handleActiveDotClick = (openIndex: number) => {
      setOpenIndex(openIndex)
      if (circleContainerRef.current) {
        rotateDotsAroundCenter(
          data,
          // dotRefs.current.map((ref) => ref.current),
          circleContainerRef.current,
          openIndex,
          onAnimationComplete,
        )
        console.log('openIndex ', openIndex)
      } else {
        console.error('Circle container not found or not mounted bdfgndnn')
      }
    }

    const handleMouseEnter = (index: number) => () => {
      animateDotEnter(index, openIndex)
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
            style={{ position: 'absolute', left: dot.x, top: dot.y }}
            onMouseEnter={handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave(index)}
            onClick={() => {
              if (openIndex === index) {
                handleCloseDot()
              } else {
                handleDotClick(index)
                handleActiveDotClick(index)
              }
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
