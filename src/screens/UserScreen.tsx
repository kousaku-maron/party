import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { useUser } from '../services/user'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, Fab, Thumbnail } from '../components/atoms'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const UserScreen = (props: Props) => {
  const { navigation, auth, signOut } = props
  const { uid } = auth

  const user = useUser(uid)

  const _signOut = useCallback(async () => {
    signOut({
      onSuccess: () => navigation.navigate('Welcome')
    })
  }, [navigation, signOut])

  const goToEdit = useCallback(() => {
    navigation.navigate('UserEdit')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.editFab}>
        <Fab color="#3498db" onPress={goToEdit}>
          <AntDesign color="white" name="edit" size={24} />
        </Fab>
      </View>

      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={user.thumbnailURL} size={200} />
      </View>

      <View>
        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>{user.name}</Text>
        </View>
      </View>

      <RoundedButton onPress={_signOut}>
        <Text>サインアウト</Text>
      </RoundedButton>
    </View>
  )
}

UserScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  editFab: {
    position: 'absolute',
    right: 24,
    bottom: 24
  },
  thumbnailWrapper: {
    paddingVertical: 24
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12
  },
  nameText: {
    fontSize: 24
  }
})

export default UserScreen
