import * as React from 'react'
import { eventsProp } from '../Types'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

export function Event({ data }: { data: eventsProp }) {
  return (
    <>
      {data.details.map((detail, index) => (
        <div key={index}>
          <h2 className="event_year">{detail.year}</h2>
          <p className="event_description">{detail.description}</p>
        </div>
      ))}
    </>
  )
}
// SwiperCore.use([]) // Подставьте необходимые модули Swiper

// interface Detail {
//   year: number
//   description: string
// }

// interface EventProps {
//   data: Detail[]
// }

// export function Event({ data }: EventProps) {
//   return (
//     <Swiper
//       spaceBetween={30}
//       slidesPerView={1}
//       navigation={{
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       }}
//     >
//       {data.map((detail, detailIndex) => (
//         <SwiperSlide key={detailIndex}>
//           <div>
//             <h2 className="event_year">{detail.year}</h2>
//             <p className="event_description">{detail.description}</p>
//           </div>
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   )
// }
