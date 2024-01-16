import * as React from 'react'
import { ForwardedCircle } from './circle/Circle'
import { eventsData } from '../assets/eventsData'
import '../assets/styles/style.scss'
import { useRef } from 'react'
import { eventsProp } from './Types'

interface EventsBlokProps {
  data: eventsProp[]
}

export function EventsBlock({ data }: EventsBlokProps, ref) {
  const eventsBlockRef = useRef<HTMLDivElement>(null)
  return (
    <div className="container">
      <div className="block">
        <h1 className="title">Исторические даты</h1>
        <ForwardedCircle ref={eventsBlockRef} data={data} />
      </div>
    </div>
  )
}
