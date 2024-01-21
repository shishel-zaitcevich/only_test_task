import * as React from 'react'

import { useEffect, useRef, useState } from 'react'
import { eventsProp } from './Types'
import Slider from './events/slider/eventsCarousel'
import PaginationComponent from './utils/PaginationComponent'
import '../assets/styles/swiperStyles.scss'
import '../assets/styles/style.scss'
import { rotateDotsAroundCenter } from '../components/utils/rotateDotsAroundCenter'
import { Dot } from './circle/Dot2'

interface EventsBlokProps {
  data: eventsProp[]
}

export function EventsBlock({ data }: EventsBlokProps, ref) {
  const eventsBlockRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)

  const handlePageChange = (index: number) => {
    setActivePage(index)
  }

  const handlePrev = () => {
    setActivePage((prevPage) => Math.max(prevPage - 1, 0))
  }

  const handleNext = () => {
    setActivePage((prevPage) => Math.min(prevPage + 1, data.length - 1))
  }

  return (
    <div className="container">
      <div className="block">
        <h1 className="title">Исторические даты</h1>
        <Dot
          data={data}
          forwardedRef={eventsBlockRef}
          onPageClick={handlePageChange}
          activePage={activePage}
        />
        <div className="swiper__wrapper">
          <div className="pagination">
            <PaginationComponent
              totalSlides={data.length}
              activePage={activePage}
              onPageClick={handlePageChange}
              data={data}
            />
            <div className="buttons">
              <button
                onClick={handlePrev}
                className="pagination__button-prev"
              ></button>
              <button
                onClick={handleNext}
                className="pagination__button-next"
              ></button>
            </div>
          </div>

          {data.map((event, index) => (
            <div
              className="slider"
              key={event.id}
              style={{
                display: index === activePage ? 'block' : 'none',
              }}
            >
              {index === activePage && (
                <Slider
                  sliderData={event.details}
                  isMobileScreen={false}
                  activePage={activePage}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
