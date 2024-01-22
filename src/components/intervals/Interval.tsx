import * as React from 'react'
import { eventsProp } from '../../components/Types'
import '../../assets/styles/intervalStyles.scss'
import { Dot } from '../../components/circle/Dot2'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface IntervalProp {
  data: eventsProp[]
  forwardedRef: React.Ref<HTMLDivElement>
  onPageClick: (index: number) => void
  setCircleContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
}

export const Interval: React.FC<IntervalProp> = ({
  data,
  setCircleContainerRef,
  // onPageClick,
}) => {
  const [activePage, setActivePage] = useState(0)
  const intervalsRef = useRef([])

  // useEffect(() => {
  //   intervalsRef.current = intervalsRef.current.slice(0, data.length)
  // }, [data.length])

  // const animateIntervals = (index) => {
  //   const intervalElement = intervalsRef.current[index]
  //   if (!intervalElement) return

  //   gsap.fromTo(
  //     intervalElement,
  //     { opacity: 0, x: -20 },
  //     { opacity: 1, x: 0, duration: 0.5 },
  //   )
  // }

  // const animateDetailsRecursive = (index, detailIndex = 0) => {
  //   const detailsElement = intervalsRef.current[index]
  //   if (!detailsElement) return

  //   gsap.fromTo(
  //     detailsElement.children[detailIndex],
  //     { opacity: 0, y: -20 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5,
  //       onComplete: () => {
  //         if (detailIndex < data[index].details.length - 1) {
  //           animateDetailsRecursive(index, detailIndex + 1)
  //         }
  //       },
  //     },
  //   )
  // }

  // useEffect(() => {
  //   data.forEach((event, index) => {
  //     const intervalElement = intervalsRef.current[index]
  //     if (!intervalElement) return

  //     if (index === activePage) {
  //       intervalElement.classList.add('active')
  //       animateDetailsRecursive(index)
  //     } else {
  //       intervalElement.classList.remove('active')
  //       animateIntervals(index)
  //     }
  //   })
  // }, [data, activePage])

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }

  return (
    <div className="interval_container">
      <Dot
        data={data}
        setCircleContainerRef={setCircleContainerRef}
        onPageClick={handlePageChange}
        forwardedRef={undefined}
      />
      {data.map((event, index) => (
        <div
          key={event.id}
          ref={(el) => (intervalsRef.current[index] = el)}
          className={`intervals ${index === activePage ? 'active' : ''}`}
          style={{
            display: index === activePage ? 'flex' : 'none',
          }}
        >
          <span className="interval_start">{event.yearsInterval.start}</span>
          <span className="interval_last">{event.yearsInterval.last}</span>
        </div>
      ))}
    </div>
  )
}
