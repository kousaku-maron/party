import React, { useCallback, useEffect } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { useUser, useUserEditTools } from '../services/user'
import { View, Text, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, Fab, TextInput, Thumbnail } from '../components/atoms'
import { LoadingPage } from '../components/pages'
import { TouchableOpacity } from 'react-native-gesture-handler'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const UserScreen = (props: Props) => {
  const { navigation, auth, signOut } = props
  const { uid } = auth

  const user = useUser(uid)
  const { pickThumbnailImage, name, onChangeName, editing, onPressNameEdit, onSubmitNameEditing } = useUserEditTools()

  // MEMO: "useUserEditTools”でnameに初期値をセットする機能を未実装のため、下記コードでセットさせている。
  useEffect(() => {
    if (!user) return
    onChangeName(user.name)
  }, [onChangeName, user])

  const _signOut = useCallback(async () => {
    signOut({
      onSuccess: () => navigation.navigate('Welcome')
    })
  }, [navigation, signOut])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={user.thumbnailURL} size={200} />
        <View style={styles.editThumnail}>
          <Fab onPress={() => pickThumbnailImage(uid)}>
            <AntDesign name="edit" size={24} color="gray" />
          </Fab>
        </View>
      </View>

      <View>
        {!editing && (
          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>{user.name}</Text>
            <TouchableOpacity style={styles.editName} onPress={onPressNameEdit}>
              <AntDesign name="edit" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        )}
        {editing && (
          <View style={styles.nameWrapper}>
            <TextInput value={name} onChangeText={onChangeName} onSubmitEditing={() => onSubmitNameEditing(uid)} />
          </View>
        )}
      </View>

      <RoundedButton onPress={_signOut}>
        <Text>サインアウト</Text>
      </RoundedButton>
    </View>
  )
}

UserScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  thumbnailWrapper: {
    position: 'relative',
    paddingVertical: 24
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12
  },
  editThumnail: {
    position: 'absolute',
    right: 0,
    bottom: 24
  },
  editName: {
    paddingLeft: 6
  },
  nameText: {
    fontSize: 24
  }
})

export default UserScreen
