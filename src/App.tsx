import * as React from 'react'
import './app.scss'
import { EventsBlock } from './components/EventsBlock'
import { useRef } from 'react'
import { eventsData } from './assets/eventsData'
import { eventsProp } from './components/Types'

const App: React.FC = () => {
  return (
    <div>
      <EventsBlock data={eventsData} />
    </div>
  )
}

export default App
