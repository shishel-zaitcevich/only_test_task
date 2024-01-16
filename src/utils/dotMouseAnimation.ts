import gsap from 'gsap'
import { CustomPath } from '../components/Types'

// Функция для анимации входа точки
export function animateDotEnter(index: number, openIndex: number | null) {
  // Анимация изменения стилей точки
  gsap.to(`#dot-${index}`, {
    duration: 0.3,
    width: 56,
    height: 56,
    backgroundColor: 'white',
    border: '1px solid #42567a',
    ease: 'power2.inOut',
  })

  // Анимация появления числа
  gsap.to(`.number`, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.inOut',
  })

  // Анимация появления заголовка
  gsap.to(`#dot-${index} .title`, {
    opacity: 1,
    x: 20,
    duration: 0.3,
    ease: 'power2.inOut',
  })

  // Дополнительная анимация для открытой точки
  // if (openIndex === index) {
  //   gsap.to(`.number`, {
  //     opacity: 1,
  //     duration: 0.3,
  //     ease: 'power2.inOut',
  //   })
  // }
}

// Функция для анимации выхода точки
export function animateDotLeave(index: number) {
  const path: CustomPath = { x: 0, y: 0 }

  // Конфигурация движущегося пути
  const motionPathConfig = {
    path,
    align: 'self',
    autoRotate: true,
  }

  // Получаем изначальные стили точки
  const initialStyles = {
    width: 6,
    height: 6,
    backgroundColor: '#42567a',
    border: 'none',
  }

  // Анимация изменения стилей точки и движения по пути
  gsap.to(`#dot-${index} `, {
    duration: 0.3,
    ...initialStyles, // Применяем изначальные стили
    ease: 'power2.inOut',
    motionPath: motionPathConfig as any,
    onComplete: () => {
      // После завершения анимации скрыть число и заголовок
      gsap.to(`#dot-${index} .number, #dot-${index} .title`, {
        opacity: 0,
        x: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })

      // Возвращаем точке изначальные стили
      gsap.to(`#dot-${index}`, {
        duration: 0.3,
        ...initialStyles,
        ease: 'power2.inOut',
      })
    },
  })
}
