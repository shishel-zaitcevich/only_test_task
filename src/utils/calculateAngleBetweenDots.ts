import { eventsProp } from '../components/Types'

export function calculateMinAngleBetweenElements(
  element1: number,
  element2: number,
  data: eventsProp[],
): number {
  // Угол между соседними элементами равен 60 градусов
  const angleBetweenElements = 360 / data.length

  // Разница порядковых номеров элементов
  const orderDifference = Math.abs(element2 - element1)

  // Рассчитываем угол между элементами
  const angle = orderDifference * angleBetweenElements

  // Возвращаем угол, округленный до целого числа
  return Math.round(angle)
}

export function calculateMinAngle(
  element1: number,
  element2: number,
  data: eventsProp[],
): number {
  // Угол между соседними элементами
  const angleBetweenElements = calculateMinAngleBetweenElements(
    element1,
    element2,
    data,
  )

  // Рассчитываем угол по часовой стрелке
  const clockwiseAngle = angleBetweenElements

  // Рассчитываем угол против часовой стрелки и делаем его отрицательным
  let counterclockwiseAngle = 360 - angleBetweenElements

  // Если угол против часовой стрелки больше 180 градусов, используем отрицательное значение
  if (counterclockwiseAngle > 180) {
    counterclockwiseAngle = 360 - counterclockwiseAngle
  }

  // Проверяем равенство углов и возвращаем угол по часовой стрелке
  if (clockwiseAngle === counterclockwiseAngle) {
    return clockwiseAngle
  }

  // Возвращаем наименьший угол с учетом знака
  return Math.min(clockwiseAngle, -counterclockwiseAngle)
}
