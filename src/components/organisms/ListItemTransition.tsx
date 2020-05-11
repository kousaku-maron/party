import React, { useMemo } from 'react'
import * as Animatable from 'react-native-animatable'

type Props = {
  isShow: boolean
  onAnimationEnd?: () => void
}

const ListItemTransition: React.FC<Props> = ({ children, isShow, onAnimationEnd }) => {
  const animationName = useMemo(() => (isShow ? 'bounceInUp' : 'fadeOutDown'), [isShow])
  const duration = useMemo(() => (isShow ? 800 : 200), [isShow])

  return (
    <Animatable.View
      animation={animationName}
      easing="ease-out"
      duration={duration}
      iterationCount={1}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </Animatable.View>
  )
}

export default ListItemTransition
