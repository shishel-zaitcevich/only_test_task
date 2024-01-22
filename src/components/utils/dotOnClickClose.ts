import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import { ActiveDotUtilsProps, ActiveDotUtilsResult } from '../Types'
import { animateDotEnter, animateDotLeave } from './dotAnimation'

export const dotOnClickClose = ({
  activeIndex,
  setActiveIndex,
}: ActiveDotUtilsProps): ActiveDotUtilsResult => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // для отслеживания предыдущей открытой точки
  const prevOpenIndexRef = useRef<number | null>(null)

  const handleDotClick = (index: number) => {
    if (openIndex === index) {
      return
    }

    // Если openIndex не равен null, запускаем анимацию исчезновения для текущего openIndex
    // и устанавливаем openIndex в null
    if (openIndex !== null) {
      animateDotLeave(openIndex)
      setOpenIndex(null)
    }

    // Устанавливаем openIndex в переданный index
    setOpenIndex(index)

    // Сохраняем index в prevOpenIndexRef для последующего использования
    prevOpenIndexRef.current = index

    // Запускаем анимацию появления для нового index
    animateDotEnter(index)

    // Устанавливаем activeIndex в переданный index
    setActiveIndex(index)
  }

  // Функция для закрытия текущей открытой точки
  const handleCloseDot = () => {
    // Если openIndex не равен null и не равен текущему activeIndex, запускаем анимацию исчезновения для openIndex
    // и устанавливаем openIndex в null
    if (openIndex !== null && openIndex !== activeIndex) {
      animateDotLeave(openIndex)
      setOpenIndex(null)
    }
  }

  // useEffect для автоматического закрытия точки при изменении activeIndex или openIndex
  useEffect(() => {
    handleCloseDot()
  }, [activeIndex, openIndex])

  // useEffect для обработки закрытия предыдущей точки при изменении activeIndex
  useEffect(() => {
    if (
      prevOpenIndexRef.current !== null &&
      prevOpenIndexRef.current !== activeIndex
    ) {
      animateDotLeave(prevOpenIndexRef.current)
      prevOpenIndexRef.current = null
    }
  }, [activeIndex])

  // useEffect для очистки ресурсов (в данном случае, для закрытия точки) при размонтировании компонента
  useEffect(() => () => handleCloseDot(), [])

  // Возвращаем объект с функциями
  return { handleDotClick, handleCloseDot }
}

// export const dotOnClickClose = ({
//   activeIndex,
//   setActiveIndex,
// }: ActiveDotUtilsProps): ActiveDotUtilsResult => {
//   const [openIndex, setOpenIndex] = useState<number | null>(null)
//   const prevOpenIndexRef = useRef<number | null>(null)

//   const handleDotClick = (index: number) => {
//     if (openIndex === index) {
//       return
//     }

//     if (openIndex !== null) {
//       animateDotLeave(openIndex)
//       setOpenIndex(null)
//     }

//     setOpenIndex(index)
//     prevOpenIndexRef.current = index
//     animateDotEnter(index)
//     setActiveIndex(index)
//   }

//   const handleCloseDot = () => {
//     if (openIndex !== null && openIndex !== activeIndex) {
//       animateDotLeave(openIndex)
//       setOpenIndex(null)
//     }
//   }

//   useEffect(() => {
//     handleCloseDot()
//   }, [activeIndex, openIndex])

//   useEffect(() => {
//     if (
//       prevOpenIndexRef.current !== null &&
//       prevOpenIndexRef.current !== activeIndex
//     ) {
//       animateDotLeave(prevOpenIndexRef.current)
//       prevOpenIndexRef.current = null
//     }
//   }, [activeIndex])

//   useEffect(() => () => handleCloseDot(), [])

//   return { handleDotClick, handleCloseDot }
// }
