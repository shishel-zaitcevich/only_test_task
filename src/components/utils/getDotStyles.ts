import { eventsProp } from '../Types'
import { calculateMinAngle } from './calculateAngleBetweenDots'

export function getDotStyles(
  index: number,
  hoverIndex: number | null,
  openIndex: number | null,
  lastElementIndex: number,
  data: eventsProp[],
): React.CSSProperties {
  const isVisible =
    (hoverIndex !== null && hoverIndex === index) ||
    (openIndex !== null && openIndex === index)

  const transformStyle =
    openIndex !== null
      ? `rotate(${
          -1 * calculateMinAngle(lastElementIndex, openIndex, data)
        }deg)`
      : 'rotate(0deg)'

  return {
    visibility: isVisible ? 'visible' : 'hidden',
    transform: transformStyle,
  }
}

// export function getHoverStyles(
//   index: number,
//   hoverIndex: number | null,
//   lastElementIndex: number,
//   data: eventsProp[],
// ): React.CSSProperties {
//   const isVisible = hoverIndex !== null && hoverIndex === index

//   const transformStyle = isVisible
//     ? `rotate(${-1 * calculateMinAngle(lastElementIndex, hoverIndex, data)}deg)`
//     : 'rotate(0deg)'

//   return {
//     visibility: isVisible ? 'visible' : 'hidden',
//     transform: transformStyle,
//     transition: 'visibility 0.3s ease, transform 0.3s ease', // Добавим анимацию
//   }
// }

export function getOpenStyles(
  index: number,
  openIndex: number | null,
  lastElementIndex: number,
  data: eventsProp[],
  // elementClass: string,
): React.CSSProperties {
  const isVisible = openIndex !== null && openIndex === index

  const transformStyle =
    openIndex !== null
      ? `rotate(${
          -1 * calculateMinAngle(lastElementIndex, openIndex, data)
        }deg)`
      : 'rotate(0deg)'
  return {
    visibility: isVisible ? 'visible' : 'hidden',
    opacity: isVisible ? 1 : 0,
    transform: transformStyle,
    transition: 'opacity 0.3s ease, transform 0.3s ease', // Добавим анимацию
    //   ...(isVisible && elementClass ? { selector: elementClass } : {}),
  }
}
