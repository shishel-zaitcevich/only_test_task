import { gsap, Power2 } from 'gsap'
import { calculateMinAngle } from './calculateAngleBetweenDots'
import { eventsProp } from '../Types'
import { getOpenStyles } from './getDotStyles'

export const rotateDotsAroundCenter = (
  data: eventsProp[],
  circleContainer: HTMLDivElement | null,
  openIndex: number | null,
  handleDotClick: (index: number) => void,
  dotRefs: React.MutableRefObject<HTMLDivElement | null>[],
) => {
  const lastElementIndex = data.length - 1
  if (!circleContainer) {
    console.error('Контейнер круга не найден или не смонтирован')
    return
  }

  const currentElement = openIndex
  const angleToLastDot = calculateMinAngle(
    currentElement,
    lastElementIndex,
    data,
  )

  gsap.to(circleContainer, {
    rotation: `${angleToLastDot}`,
    transformOrigin: '50% 50%',
    duration: 2,
    ease: Power2.easeInOut,
    onUpdate: () => {
      if (openIndex == currentElement) {
        applyStylesToElement(
          dotRefs[currentElement],
          getOpenStyles(currentElement, openIndex, lastElementIndex, data),
        )
      }
    },
    onComplete: () => {
      gsap.set(circleContainer, { rotation: angleToLastDot })
      console.log('currentElement', currentElement)
      handleDotClick(openIndex)
    },
  })
}

export function applyStylesToElement(
  elementRef: React.MutableRefObject<HTMLDivElement | null>,
  styles: React.CSSProperties,
) {
  if (elementRef.current) {
    const numberElement = elementRef.current.querySelector(
      '.number',
    ) as HTMLDivElement

    if (numberElement) {
      Object.assign(numberElement.style, styles)
    }
  }
}
