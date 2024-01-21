import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import { ActiveDotUtilsProps, ActiveDotUtilsResult } from '../Types'
import { animateDotEnter, animateDotLeave } from './dotAnimation'

export const dotOnClickClose = ({
  activeIndex,
  setActiveIndex,
}: ActiveDotUtilsProps): ActiveDotUtilsResult => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prevOpenIndexRef = useRef<number | null>(null)

  const handleDotClick = (index: number) => {
    if (openIndex === index) {
      return
    }

    if (openIndex !== null) {
      animateDotLeave(openIndex)
      setOpenIndex(null)
    }

    setOpenIndex(index)
    prevOpenIndexRef.current = index
    animateDotEnter(index)
    setActiveIndex(index)
  }

  const handleCloseDot = () => {
    if (openIndex !== null && openIndex !== activeIndex) {
      animateDotLeave(openIndex)
      setOpenIndex(null)
    }
  }

  useEffect(() => {
    handleCloseDot()
  }, [activeIndex, openIndex])

  useEffect(() => {
    if (
      prevOpenIndexRef.current !== null &&
      prevOpenIndexRef.current !== activeIndex
    ) {
      animateDotLeave(prevOpenIndexRef.current)
      prevOpenIndexRef.current = null
    }
  }, [activeIndex])

  useEffect(() => () => handleCloseDot(), [])

  return { handleDotClick, handleCloseDot }
}
