import * as React from 'react'
import '../../assets/styles/circle.scss'
import { Dot } from './Dot2'
import { eventsProp } from '../Types'
import { Ref, forwardRef, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface CircleProps {
  data: eventsProp[]
}

export const ForwardedCircle = forwardRef<HTMLDivElement, CircleProps>(
  ({ data }: CircleProps, ref) => {
    const circleContainerRef = useRef<HTMLDivElement>(null)

    return (
      <Dot
        data={data}
        forwardedRef={(el) => {
          circleContainerRef.current = el
          if (typeof ref === 'function') {
            ref(el)
          } else if (ref) {
            ref.current = el
          }
        }}
      />
    )
  },
)
