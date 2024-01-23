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
  dotRefs: Array<React.MutableRefObject<HTMLDivElement | null>>

  setCircleContainerRef: (ref: React.RefObject<HTMLDivElement>) => void
}

export const Interval: React.FC<IntervalProp> = ({
  data,
  setCircleContainerRef,
  onPageClick,
  dotRefs,
}) => {
  const [activePage, setActivePage] = useState(0)
  const intervalsRef = useRef([])

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
        dotRefs={dotRefs}
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
