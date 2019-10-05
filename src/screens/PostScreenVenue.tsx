import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { useUser, useUserEditTools } from '../services/user'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const PostScreen = (props: Props) => {
  const { navigation, auth } = props

  const { uid } = auth

  const user = useUser(uid)
  const { onChangeName } = useUserEditTools()
  // MEMO: "useUserEditTools”でnameに初期値をセットする機能を未実装のため、下記コードでセットさせている。
  useEffect(() => {
    if (!user) return
    onChangeName(user.name)
  }, [onChangeName, user])

  const postVenueArea = async venue => {
    navigation.navigate('PostFinish', { venue: venue })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleArea}>Which Area?</Text>
      <TouchableOpacity
        onPress={() => {
          postVenueArea('Shibuya')
        }}
        style={styles.areaImageTouchable}
      >
        <Image source={require('../../assets/images/shibuya.png')} style={styles.areaImage} />
      </TouchableOpacity>
      <Text>Shibuya</Text>
      <TouchableOpacity onPress={() => Alert.alert('Hello')} style={styles.areaImageTouchable}>
        <Image source={require('../../assets/images/shinbashi.png')} style={styles.areaImage} />
      </TouchableOpacity>
      <Text>Shinbashi</Text>
      <TouchableOpacity onPress={() => Alert.alert('Hello')} style={styles.areaImageTouchable}>
        <Image source={require('../../assets/images/yokohama.png')} style={styles.areaImage} />
      </TouchableOpacity>
      <Text>Yokohama</Text>
    </View>
  )
}

PostScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1
  },
  areaImageTouchable: {
    width: '28%',
    height: '28%'
  },
  titleArea: {
    fontSize: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24
  }
})

export default PostScreen
