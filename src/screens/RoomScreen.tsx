import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { isIPhoneX, isIPhoneXAbove, X_ABOVE_HEADER_NOTCH_HEIGHT, ANDROID_STATUS_BAR_HEIGHT } from '../services/design'
import { useStyles, MakeStyles } from '../services/design'
import { ChatRoomListPage, SwipeCardPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'

type Section = 'card' | 'chat'

const RoomScreen = () => {
  const navigation = useNavigation()
  const [section, setSection] = useState<Section>('chat')
  const styles = useStyles(makeStyles)

  const onPressRoom = useCallback(
    (roomID: string) => {
      navigation.navigate('Chat', { roomID })
    },
    [navigation]
  )

  const onPressCardTab = useCallback(() => {
    setSection('card')
  }, [])

  const onPressChatTab = useCallback(() => {
    setSection('chat')
  }, [])

  return (
    <BottomTabLayout>
      <View style={styles.container}>
        <View style={styles.inner}>
          {/* TODO: タブをコンポーネント化 */}
          <View style={styles.tabs}>
            <TouchableOpacity style={styles.tab} onPress={onPressCardTab}>
              <Text style={section === 'card' ? styles.tabActiveLabel : styles.tabLabel}>カード</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={onPressChatTab}>
              <Text style={section === 'chat' ? styles.tabActiveLabel : styles.tabLabel}>メッセージ</Text>
            </TouchableOpacity>
          </View>

          {section === 'card' && <SwipeCardPage />}
          {section === 'chat' && <ChatRoomListPage onPressItem={onPressRoom} />}
        </View>
      </View>
    </BottomTabLayout>
  )
}

RoomScreen.navigationOptions = () => ({ headerShown: false })

const hairlineWidth = StyleSheet.hairlineWidth
const fullWidth = Dimensions.get('window').width

const TOP_SPACE = Platform.select({
  ios: isIPhoneX() || isIPhoneXAbove() ? X_ABOVE_HEADER_NOTCH_HEIGHT : 0,
  android: ANDROID_STATUS_BAR_HEIGHT,
  default: 0
})

const APPBAR_HEIGHT = Platform.select({
  ios: 44,
  android: 56,
  default: 64
})

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      position: 'relative',
      width: '100%',
      height: '100%'
    },
    inner: {
      paddingTop: APPBAR_HEIGHT + TOP_SPACE,
      width: '100%',
      height: '100%',
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center'
    },
    tabs: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      paddingTop: TOP_SPACE,
      width: fullWidth,
      height: APPBAR_HEIGHT + TOP_SPACE,
      backgroundColor: colors.backgrounds.secondary,
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth,
      zIndex: 1100
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    tabLabel: {
      color: colors.foregrounds.primary
    },
    tabActiveLabel: {
      color: colors.tints.primary.main
    }
  })

export default RoomScreen
