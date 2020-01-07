import React, { useCallback } from 'react'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { View, ScrollView, StyleSheet } from 'react-native'
import { RoomListItem } from '../components/organisms'
import { useRoomsWithUser } from '../services/room'
import { useStyles, MakeStyles } from '../services/design'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const RoomScreen = ({ navigation }: Props) => {
  const roomsWithUser = useRoomsWithUser()
  const styles = useStyles(makeStyles)

  const onPress = useCallback(
    (roomID: string) => {
      navigation.navigate('Chat', { roomID })
    },
    [navigation]
  )

  return (
    <View style={styles.container}>
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
    </View>
  )
}

RoomScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

const hairlineWidth = StyleSheet.hairlineWidth

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    divider: {
      borderBottomColor: colors.system.gray,
      borderBottomWidth: hairlineWidth
    }
  })

export default RoomScreen
