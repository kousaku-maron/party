import React, { useCallback, useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Platform } from 'react-native'
import { RoomListItem } from '../components/organisms'
import { isIPhoneX, isIPhoneXAbove, X_ABOVE_HEADER_NOTCH_HEIGHT, ANDROID_STATUS_BAR_HEIGHT } from '../services/design'
import { useRoomsWithUser } from '../services/room'
import { useStyles, MakeStyles } from '../services/design'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

type Section = 'card' | 'chat'

const RoomScreen = ({ navigation }: Props) => {
  const [section, setSection] = useState<Section>('chat')
  const roomsWithUser = useRoomsWithUser()
  const styles = useStyles(makeStyles)

  const onPress = useCallback(
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

        {section === 'card' && (
          <View>
            <Text>card screen</Text>
          </View>
        )}

        {section === 'chat' && (
          <ScrollView>
            {roomsWithUser.map(roomWithUser => (
              <React.Fragment key={roomWithUser.id}>
                <RoomListItem
                  users={roomWithUser.users}
                  onPress={() => {
                    onPress(roomWithUser.id)
                  }}
                />
                <View style={styles.divider} />
              </React.Fragment>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
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
      paddingTop: TOP_SPACE,
      width: '100%',
      height: '100%'
    },
    inner: {
      position: 'relative',
      paddingTop: APPBAR_HEIGHT,
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
      width: fullWidth,
      height: APPBAR_HEIGHT,
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
    },
    divider: {
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth
    }
  })

export default RoomScreen
