import React from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  StyleSheet,
  NativeSyntheticEvent,
  TargetedEvent
} from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  uri?: string
  size?: number
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
  onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void
  borderColor?: string
  borderWidth?: number
}

const Thumbnail: React.FC<Props> = ({
  uri,
  borderColor,
  borderWidth,
  disabled = false,
  size = 24,
  onPress,
  onFocus
}) => {
  const styles = useStyles(makeStyles)

  if (!onPress) {
    return (
      <View style={styles.container}>
        {uri && (
          <Image
            source={{ uri }}
            style={[styles.img, { width: size, height: size, borderRadius: size / 2, borderColor, borderWidth }]}
          />
        )}
        {!uri && (
          <Image
            source={require('../../../assets/images/no_user.png')}
            style={[styles.img, { width: size, height: size, borderRadius: size / 2, borderColor, borderWidth }]}
          />
        )}
      </View>
    )
  }

  return (
    <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress} onFocus={onFocus}>
      {uri && (
        <Image
          source={{ uri }}
          style={[styles.img, { width: size, height: size, borderRadius: size / 2, borderColor, borderWidth }]}
        />
      )}
      {!uri && (
        <Image
          source={require('../../../assets/images/no_user.png')}
          style={[styles.img, { width: size, height: size, borderRadius: size / 2, borderColor, borderWidth }]}
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

export default Thumbnail
