import { useRef, useMemo, useState, useEffect, useCallback } from 'react'
import { Animated, PanResponder, Dimensions, Keyboard } from 'react-native'

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

export const useKeyboardState = ({
  useWillShow = false,
  useWillHide = false
}: {
  useWillShow?: boolean
  useWillHide?: boolean
}) => {
  const [visible, setVisible] = useState<boolean>(false)

  const showEvent = useWillShow ? 'keyboardWillShow' : 'keyboardDidShow'
  const hideEvent = useWillHide ? 'keyboardWillHide' : 'keyboardDidHide'

  const onKeyboardShow = useCallback(() => {
    setVisible(true)
  }, [])

  const onKeyboardHide = useCallback(() => {
    setVisible(false)
  }, [])

  useEffect(() => {
    Keyboard.addListener(showEvent, onKeyboardShow)

    return () => {
      Keyboard.removeListener(showEvent, onKeyboardShow)
    }
  }, [onKeyboardShow, showEvent])

  useEffect(() => {
    Keyboard.addListener(hideEvent, onKeyboardHide)

    return () => {
      Keyboard.removeListener(hideEvent, onKeyboardHide)
    }
  }, [hideEvent, onKeyboardHide])

  return { visible }
}

export const useLayoutTransitions = <T>(initialLayout: T) => {
  const [activeLayout, setActiveLayout] = useState<T | null>(initialLayout)
  const [outLayout, setOutLayout] = useState<T | null>(null)
  const [inLayout, setInLayout] = useState<T | null>(initialLayout)

  const onOutAnimationStart = useCallback(
    ({ toLayout, withAnimation = true }: { toLayout?: T; withAnimation?: boolean }) => {
      setOutLayout(activeLayout)

      if (toLayout) {
        setInLayout(toLayout)
      }

      if (!withAnimation) {
        setActiveLayout(toLayout)
      }
    },
    [activeLayout]
  )

  const onOutAnimationEnd = useCallback(() => {
    setActiveLayout(inLayout)
  }, [inLayout])

  return { activeLayout, inLayout, outLayout, onOutAnimationStart, onOutAnimationEnd }
}
