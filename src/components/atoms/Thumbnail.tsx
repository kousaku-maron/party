import React from 'react'
import { TouchableOpacity, Image, GestureResponderEvent, StyleSheet } from 'react-native'

type Props = {
  uri?: string
  size?: number
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

const Thumbnail: React.FC<Props> = ({ uri, disabled = false, size = 24, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}
      disabled={disabled}
      onPress={onPress}
    >
      {uri && <Image source={{ uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />}
      {!uri && (
        <Image
          source={require('../../../assets/images/no_user.png')}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  }
})

export default Thumbnail