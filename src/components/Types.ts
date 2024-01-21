export interface eventsProp {
  id: string
  number: number
  title: string
  yearsInterval: {
    start: number
    last: number
  }
  details: {
    year: number
    description: string
  }[]
}

export interface DotAnimationProps {
  index: number
  isOpen: boolean
  openIndex: number | null
}

export interface DotProps {
  data: eventsProp
  onEnter: () => void
  onLeave: () => void
  onClick: () => void
}

export interface CustomPath {
  x: number
  y: number
}

export interface ActiveDotUtilsProps {
  activeIndex: number | null
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>
}

export interface ActiveDotUtilsResult {
  handleDotClick: (index: number) => void
  handleCloseDot: () => void
}

export interface Point {
  x: number
  y: number
}

export interface SlideData {
  year: number
  description: string
}

export interface SliderProps {
  sliderData: SlideData[]
  isMobileScreen: boolean
  activePage: number
}
