import gsap from 'gsap'
import { CustomPath } from '../Types'

import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// gsap.registerPlugin(MotionPathPlugin)

export function animateDotEnter(index: number) {
  const dotSelector = `#dot-${index}`
  const numberSelector = `#dot-${index} .number`

  console.log('numberSelector', numberSelector)

  gsap.to(dotSelector, {
    duration: 0.2,
    width: 56,
    height: 56,
    backgroundColor: 'white',
    border: '1px solid #42567a',
    ease: 'power2.inOut',
  })

  gsap.to(`${numberSelector}`, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.inOut',
    // rotate: '360',
  })

  // gsap.to(`${labelSelector}`, {
  //   opacity: 1,
  //   x: 20,
  //   duration: 0.5, // увеличили продолжительность
  //   // ease: 'power2.inOut',
  //   delay: 1,
  // })
}

export function animateDotShowTitle(index: number) {
  const labelSelector = `#dot-${index} .label`
  console.log('labelSelector', labelSelector)
  gsap.to(`${labelSelector}`, {
    opacity: 1,
    x: 20,
    duration: 0.5, // увеличили продолжительность
    ease: 'power2.inOut',
    delay: 1,
  })
}

export function animateDotLeave(index: number) {
  const dotSelector = `#dot-${index}`
  const numberAndTitleSelector = `${dotSelector} .number, ${dotSelector} .title`

  const motionPathConfig = {
    path: { x: 0, y: 0 },
    align: 'self',
    autoRotate: true,
  }

  const initialStyles = {
    width: 6,
    height: 6,
    backgroundColor: '#42567a',
    border: 'none',
  }

  gsap.to(dotSelector, {
    duration: 0.3,
    ...initialStyles,
    ease: 'power2.inOut',
    motionPath: motionPathConfig as any,
    onComplete: () => {
      gsap.to(numberAndTitleSelector, {
        opacity: 0,
        x: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })

      gsap.to(dotSelector, {
        duration: 0.3,
        ...initialStyles,
        ease: 'power2.inOut',
      })
    },
  })
}
