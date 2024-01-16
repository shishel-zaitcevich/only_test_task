import { useEffect, useRef } from 'react'
import gsap from 'gsap'

import { ActiveDotUtilsProps, ActiveDotUtilsResult } from '../components/Types'
import { animateDotLeave } from './dotMouseAnimation'

// Пользовательский хук для управления активной точкой
export const dotOnClickClose = ({
  activeIndex,
  setActiveIndex,
}: ActiveDotUtilsProps): ActiveDotUtilsResult => {
  // Используем useRef для отслеживания активного индекса между рендерами
  const activeIndexRef = useRef(activeIndex)

  // Обработчик клика вне активной точки
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement

    if (
      activeIndexRef.current !== null &&
      !target.closest(`#dot-${activeIndexRef.current}`)
    ) {
      // Вызываем анимацию при клике мимо активной точки
      animateDotLeave(activeIndexRef.current)
      // Закрываем активную точку
      handleCloseDot()
    }
  }

  // Обработчик клика по точке
  const handleDotClick = (index: number) => {
    // Вызываем анимацию при клике по другой точке
    animateDotLeave(activeIndexRef.current)
    // Устанавливаем новый активный индекс
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  // Закрытие активной точки
  const handleCloseDot = () => {
    if (activeIndexRef.current !== null) {
      // Анимация выхода активной точки
      animateDotLeave(activeIndexRef.current)
      // Сброс активного индекса
      setActiveIndex(null)
    }
  }

  useEffect(() => {
    // Обновляем текущий активный индекс при изменении внешнего активного индекса
    activeIndexRef.current = activeIndex

    // Добавляем обработчик события клика при монтировании компонента
    document.addEventListener('click', handleClickOutside)

    // Удаляем обработчик события клика при размонтировании компонента
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [activeIndex, setActiveIndex])

  // Возвращаем функции для управления активной точкой

  return { handleDotClick, handleCloseDot }
}
