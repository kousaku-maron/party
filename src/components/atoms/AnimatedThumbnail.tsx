import React, { useRef } from 'react'
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  StyleSheet,
  NativeSyntheticEvent,
  TargetedEvent
} from 'react-native'
import Animated, { multiply } from 'react-native-reanimated'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  uri?: string
  size?: Animated.Node<number>
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void
  borderColor?: string
  borderWidth?: number
}

const AnimatedThumbnail: React.FC<Props> = ({
  uri,
  borderColor,
  borderWidth,
  disabled = false,
  size = 24,
  onPress,
  onFocus
}) => {
  const styles = useStyles(makeStyles)

  const halfSize = useRef(multiply(size, 1 / 2))

  if (!onPress) {
    return (
      <View style={styles.container}>
        {uri && (
          <Animated.Image
            source={{ uri }}
            style={[
              styles.img,
              { width: size, height: size, borderRadius: halfSize.current, borderColor, borderWidth }
            ]}
          />
        )}
        {!uri && (
          <Animated.Image
            source={require('../../../assets/images/no_user.png')}
            style={[
              styles.img,
              { width: size, height: size, borderRadius: halfSize.current, borderColor, borderWidth }
            ]}
          />
        )}
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress} onFocus={onFocus}>
      {uri && (
        <Animated.Image
          source={{ uri }}
          style={[styles.img, { width: size, height: size, borderRadius: halfSize.current, borderColor, borderWidth }]}
        />
      )}
      {!uri && (
        <Animated.Image
          source={require('../../../assets/images/no_user.png')}
          style={[styles.img, { width: size, height: size, borderRadius: halfSize.current, borderColor, borderWidth }]}
        />
      )}
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    img: {
      backgroundColor: colors.system.gray
    }
  })

export default AnimatedThumbnail
