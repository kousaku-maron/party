import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { WelcomeScreenState, WelcomeScreenActions } from '../containers/WelcomeScreen'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & WelcomeScreenState & WelcomeScreenActions

const PostFinishScreen = (props: Props) => {
  const { navigation } = props
  const { goBack } = navigation

  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.titleArea}>
        <Text style={styles.titleText}>完了しました．</Text>
      </View>
      <TouchableOpacity
        style={styles.titleArea}
        onPress={() => {
          goBack(null)
        }}
      >
        <Text style={styles.subText}>戻る</Text>
      </TouchableOpacity>
    </View>
  )
}

PostFinishScreen.navigationOptions = () => ({
  header: null
})

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.2,
    backgroundColor: 'black',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  titleArea: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 96
  },
  titleText: {
    color: 'white',
    fontSize: 64
  },
  subText: {
    color: 'white',
    fontSize: 20,
    letterSpacing: 4
  }
})

export default PostFinishScreen
