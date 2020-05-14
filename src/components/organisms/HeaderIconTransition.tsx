import React, { useMemo } from 'react'
import * as Animatable from 'react-native-animatable'
import { CustomAnimation } from 'react-native-animatable'

type Props = {
  isShow: boolean
  onAnimationEnd?: () => void
}

const animIn: CustomAnimation = {
  from: {
    opacity: 0,
    scaleX: 0.5,
    scaleY: 0.5
  },
  to: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1
  },
  easing: 'ease-out'
}

const animOut: CustomAnimation = {
  from: {
    opacity: 1,
    scaleX: 1,
    scaleY: 1
  },
  to: {
    opacity: 0,
    scaleX: 0.5,
    scaleY: 0.5
  },
  easing: 'ease-out'
}

const HeaderIconTransition: React.FC<Props> = ({ children, isShow, onAnimationEnd }) => {
  const animation = useMemo(() => (isShow ? animIn : animOut), [isShow])

  return (
    <Animatable.View
      animation={animation}
      easing="ease-out"
      duration={200}
      iterationCount={1}
      onTransitionEnd={onAnimationEnd}
    >
      {children}
    </Animatable.View>
  )
}

export default HeaderIconTransition
