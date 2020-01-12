import { useRef, useMemo } from 'react'
import { Animated, PanResponder, Dimensions } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width

export type TinderSwipeAnimationProps = {
  onSwipeRight?: () => void
  onSwipeLeft?: () => void
}

export const useTinderSwipeAnimation = ({ onSwipeRight, onSwipeLeft }: TinderSwipeAnimationProps) => {
  const position = useRef(new Animated.ValueXY()).current

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            friction: 4
          }).start(() => {
            if (onSwipeRight) {
              onSwipeRight()
            }
            position.setValue({ x: 0, y: 0 })
          })
          return
        }

        if (gestureState.dx < -120) {
          Animated.spring(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            friction: 4
          }).start(() => {
            if (onSwipeLeft) {
              onSwipeLeft()
            }
            position.setValue({ x: 0, y: 0 })
          })
          return
        }

        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4
        }).start()
      }
    })
  ).current

  const rotate = useMemo(
    () =>
      position.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
        outputRange: ['-10deg', '0deg', '10deg'],
        extrapolate: 'clamp'
      }),
    [position.x]
  )

  const rotateAndTranslate = useMemo(
    () => ({
      transform: [{ rotate }, ...position.getTranslateTransform()]
    }),
    [position, rotate]
  )

  return { panHandlers: panResponder.panHandlers, targetStyle: rotateAndTranslate }
}
