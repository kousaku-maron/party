import React, { useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useColors, MakeStyles, useStyles } from '../../services/design'
import { useUIActions, useUIState } from '../../store/hooks'
import { Icons } from '../../@assets/vector-icons'

type Props = {
  width?: number
  height?: number
  fullWidth?: boolean
}

const tabHeight = 70 // MEMO: 49がタブの標準だが、ダサいので太めにしている。

const BottomTab: React.FC<Props> = ({ width = 350, height = tabHeight, fullWidth = false }) => {
  const navigation = useNavigation()
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const { tabState } = useUIState()
  const { setTabState } = useUIActions()

  const onPressHome = useCallback(() => {
    navigation.navigate('HomeSection')
    setTabState('home')
  }, [navigation, setTabState])

  const onPressChat = useCallback(() => {
    navigation.navigate('RoomSection')
    setTabState('chat')
  }, [navigation, setTabState])

  const onPressUser = useCallback(() => {
    navigation.navigate('UserSection')
    setTabState('user')
  }, [navigation, setTabState])

  return (
    <View
      style={[
        styles.container,
        {
          width: fullWidth ? '100%' : width,
          height,
          borderRadius: height / 2
        }
      ]}
    >
      <TouchableOpacity style={styles.iconWrapper} onPress={onPressHome}>
        <Icons name="home" color={tabState === 'home' ? colors.tints.primary.main : colors.foregrounds.placeholder} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={onPressChat}>
        <Icons name="chat" color={tabState === 'chat' ? colors.tints.primary.main : colors.foregrounds.placeholder} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconWrapper} onPress={onPressUser}>
        <Icons name="user" color={tabState === 'user' ? colors.tints.primary.main : colors.foregrounds.placeholder} />
      </TouchableOpacity>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: colors.backgrounds.tertiary
    },
    iconWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

export default BottomTab
