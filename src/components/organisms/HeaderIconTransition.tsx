import React, { useMemo } from 'react'
import * as Animatable from 'react-native-animatable'
import { CustomAnimation } from 'react-native-animatable'

type Props = {
  isShow: boolean
  onAnimationEnd?: () => void
}

const animIn: CustomAnimation = {
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  },
  easing: 'ease-out'
}

const animOut: CustomAnimation = {
  from: {
    translateY: 0,
    opacity: 1
  },
  to: {
    translateY: -40,
    opacity: 0
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
