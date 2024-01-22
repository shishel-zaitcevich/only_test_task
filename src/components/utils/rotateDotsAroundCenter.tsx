import { gsap, Power2 } from 'gsap'
import { calculateMinAngle } from './calculateAngleBetweenDots'
import { eventsProp } from '../Types'
import { DotsPositionCalculate } from './dotsPositionCalculate'
import {
  animateDotEnter,
  // animateDotShowTitle,
  animateDotLeave,
} from './dotAnimation'
import { useContext } from 'react'

export const rotateDotsAroundCenter = (
  data: eventsProp[],
  circleContainer: HTMLDivElement | null,
  openIndex: number | null,
  handleDotClick: (index: number) => void,
  // setAngleToLastDot: React.Dispatch<React.SetStateAction<number | null>>,
) => {
  const lastElementIndex = data.length - 1
  if (!circleContainer) {
    console.error('Контейнер круга не найден или не смонтирован')
    return
  }

  // animateDotEnter(openIndex)
  const currentElement = openIndex
  const angleToLastDot = calculateMinAngle(
    currentElement,
    lastElementIndex,
    data,
  )
  // setAngleToLastDot(angleToLastDot)
  // console.log('angleToLastDot точка', angleToLastDot)
  // console.log('angleToLastDot точка', angleToLastDot)
  // Запускаем анимацию вращения
  gsap.to(circleContainer, {
    rotation: `${angleToLastDot}`,
    transformOrigin: '50% 50%',
    duration: 2,
    ease: Power2.easeInOut,
    onUpdate: () => {
      // Обновление активного индекса в процессе анимации
      if (openIndex !== currentElement) {
        // Call animateDotLeave for the previous index
        animateDotLeave(currentElement)
        console.log('currentElement', currentElement)
      }
    },
    onComplete: () => {
      // Завершение текущей анимации
      // animateDotEnter(openIndex)
      gsap.set(circleContainer, { rotation: angleToLastDot })
      // Обнуление активной точки после завершения анимации
      // animateDotShowTitle(openIndex)
      // animateDotEnter(openIndex)
      const title = document.querySelector('title')
      handleDotClick(openIndex)
      // if (
      //   openIndex !== currentElement + 1 ||
      //   openIndex !== currentElement - 1
      // ) {
      //   // Call animateDotLeave for the previous index
      //   animateDotLeave(currentElement)
      //   console.log('currentElement', currentElement)
      // }
      // gsap.to(`#dot-${openIndex} .title`, {
      //   opacity: 1,
      //   x: 20,
      //   duration: 0.3,
      //   ease: 'power2.inOut',
      //   delay: 2,
      // })
    },
  })
}
