import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import '../../../assets/styles/swiperStyles.scss'
import { SliderProps } from '../../Types'
import { SlideData } from '../../Types'
import { animateDotEnter } from '../../utils/dotAnimation'

SwiperCore.use([Pagination, Navigation])

const Slider: React.FC<SliderProps> = ({
  sliderData,
  isMobileScreen,
  activePage,
}) => {
  const paginationRef = useRef<any>(null)
  const [isPrevButtonActive, setPrevButtonActive] = useState(false)
  const [isNextButtonActive, setNextButtonActive] = useState(true)

  useEffect(() => {
    // Вызываем animateDotEnter при каждом изменении activePage
    animateDotEnter(activePage)
    console.log('activePageыдшвук', activePage)
  }, [activePage])

  const handleSlideChange = (swiper: any) => {
    setPrevButtonActive(!swiper.isBeginning)
    setNextButtonActive(!swiper.isEnd)
  }

  useEffect(() => {
    const prevButton = document.querySelector(
      '.swiper__button-prev',
    ) as HTMLElement
    const nextButton = document.querySelector(
      '.swiper__button-next',
    ) as HTMLElement

    if (prevButton) {
      if (isPrevButtonActive) {
        prevButton.style.display = 'block'
      } else {
        prevButton.style.display = 'none'
      }
    }

    if (nextButton) {
      if (isNextButtonActive) {
        nextButton.style.display = 'flex'
      } else {
        nextButton.style.display = 'none'
      }
    }
  }, [isPrevButtonActive, isNextButtonActive])

  return (
    <>
      <button className="swiper__button-prev "></button>

      <Swiper
        slidesPerView={isMobileScreen ? 2 : 3}
        freeMode={isMobileScreen ? true : false}
        grabCursor={isMobileScreen ? false : true}
        navigation={{
          prevEl: '.swiper__button-prev',
          nextEl: '.swiper__button-next',
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        onSlideChange={handleSlideChange}
        className="swiper"
      >
        {sliderData.map((item: SlideData, index: number) => (
          <SwiperSlide key={item.year}>
            <div className="swiper_slide__year">{item.year}</div>
            <div className="swiper_slide__description">{item.description}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper__button-next"></button>
    </>
  )
}

export default Slider
