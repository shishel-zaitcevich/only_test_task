import { eventsData } from '../../assets/eventsData'
import { eventsProp } from '../Types'

export function DotsPositionCalculate(data: eventsProp[]) {
  const numDots = data.length
  const circleRadius = 265
  // Рассчитываем шаг между точками
  const angleStep = (2 * Math.PI) / numDots

  // Рассчитываем координаты каждой точки
  const newDots = Array.from({ length: numDots }).map((_, index) => {
    const angle = angleStep * index
    const x = circleRadius * Math.cos(angle)
    const y = circleRadius * Math.sin(angle)

    return { x, y }
  })
  return newDots
}

// console.log('DotsPositionCalculate', DotsPositionCalculate(eventsData))
