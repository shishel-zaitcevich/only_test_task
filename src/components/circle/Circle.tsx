import * as React from 'react'
// import '../../assets/styles/circle.scss'
// import { Dot } from './Dot2'
import { eventsProp } from '../Types'
// import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

export interface CircleProps {
  data: eventsProp[]
  onPageClick: (index: number) => void
}

// export const ForwardedCircle = forwardRef<HTMLDivElement, CircleProps>(
//   ({ data, onPageClick, ...rest }: CircleProps, ref) => {
//     const circleContainerRef = useRef<HTMLDivElement>(null)

//     console.log('circleContainerRef:', circleContainerRef)

//     const handlePageClick = (index: number) => {
//       if (onPageClick) {
//         onPageClick(index)
//       }
//     }

//     useEffect(() => {
//       console.log('onPageClick in ForwardedCircle:', onPageClick)
//     }, [onPageClick])

//     return (
//       <Dot
//         data={data}
//         forwardedRef={(el) => {
//           circleContainerRef.current = el
//           if (typeof ref === 'function') {
//             ref(el)
//           } else if (ref) {
//             ref.current = el
//           }
//         }}
//         onPageClick={handlePageClick}
//       />
//     )
//   },
// )
