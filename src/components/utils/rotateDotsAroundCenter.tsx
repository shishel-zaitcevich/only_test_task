import { gsap, Power2 } from 'gsap'
import { calculateMinAngle } from './calculateAngleBetweenDots'
import { eventsProp } from '../Types'
import { DotsPositionCalculate } from './dotsPositionCalculate'
import { animateDotEnter, animateDotEnterShowTitle } from './dotAnimation'
import { useContext } from 'react'

export const rotateDotsAroundCenter = (
  data: eventsProp[],
  circleContainer: HTMLDivElement | null,
  openIndex: number | null,
  handleDotClick: (index: number) => void,
) => {
  // console.log('circleContainer', circleContainer)
  if (!circleContainer) {
    console.error('Контейнер круга не найден или не смонтирован')
    return
  }

  animateDotEnter(openIndex)
  const currentElement = openIndex

  const lastElementIndex = data.length - 1
  const angleToLastDot = calculateMinAngle(
    currentElement,
    lastElementIndex,
    data,
  )

  // console.log('angleToLastDot точка', angleToLastDot)
  // console.log('angleToLastDot точка', angleToLastDot)
  // Запускаем анимацию вращения
  gsap.to(circleContainer, {
    rotation: `${angleToLastDot}`,
    transformOrigin: '50% 50%',
    duration: 2,
    ease: Power2.easeInOut,
    // onUpdate: () => {
    //   // Обновление активного индекса в процессе анимации
    //   const newIndex = openIndex // Используем переданный индекс
    //   console.log('newIndex', newIndex)
    //   if (newIndex !== openIndex) {
    //     handleDotClick(newIndex)
    //   }
    // },
    onComplete: () => {
      // Завершение текущей анимации

      gsap.set(circleContainer, { rotation: angleToLastDot })
      // Обнуление активной точки после завершения анимации
      // animateDotEnterShowTitle(openIndex)
      handleDotClick(openIndex)
      gsap.to(`#dot-${openIndex} .title`, {
        opacity: 1,
        x: 20,
        duration: 0.3,
        ease: 'power2.inOut',
        delay: 2,
      })
    },
  })
}
