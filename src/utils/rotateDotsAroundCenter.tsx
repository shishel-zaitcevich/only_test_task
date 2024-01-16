import { gsap, Power2 } from 'gsap'
import { calculateMinAngle } from './calculateAngleBetweenDots'
import { eventsProp } from '../components/Types'
import { DotsPositionCalculate } from './dotsPositionCalculate'

export const rotateDotsAroundCenter = (
  data: eventsProp[],
  // dotRefs: Array<HTMLDivElement | null>,
  circleContainer: HTMLDivElement | null,
  openIndex: number | null,
  onAnimationComplete: (index: number) => void,
) => {
  if (!circleContainer) {
    console.error('Контейнер круга не найден или не смонтирован')
    return
  }

  // Рассчитываем позиции для каждого dotRef
  // const dotsPositions = DotsPositionCalculate(data)

  // Находим активный dotRef
  // const activeDot = dotRefs[openIndex || 0]
  // if (!activeDot) {
  //   console.error('Активный dotRef не найден')
  //   return
  // }

  // Получаем координаты центра активного dotRef
  // const activeDotRect = activeDot.getBoundingClientRect()
  // const activeDotCenterX = activeDotRect.left + activeDotRect.width / 2
  // const activeDotCenterY = activeDotRect.top + activeDotRect.height / 2

  // const lastDotPosition = dotsPositions[dotsPositions.length - 1]
  const currentElement = openIndex

  const lastElementIndex = data.length - 1
  const angleToLastDot = calculateMinAngle(
    currentElement,
    lastElementIndex,
    data,
  )

  console.log('angleToLastDot точка', angleToLastDot)

  // Запускаем анимацию вращения
  gsap.to(circleContainer, {
    rotation: `${angleToLastDot}`,
    transformOrigin: '50% 50%',
    duration: 2,
    ease: Power2.easeInOut,
    onComplete: () => {
      // Завершение текущей анимации
      gsap.set(circleContainer, { rotation: angleToLastDot })
      // Обнуление активной точки после завершения анимации
      onAnimationComplete(openIndex)
      console.log('dotRefs activeIndex', openIndex)
    },
  })
}
