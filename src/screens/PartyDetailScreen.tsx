import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps

const PartyDetailScreen = (props: Props) => {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text>party detail screen</Text>
      <Text>{navigation.state.params.partyId}</Text>
    </View>
  )
}

PartyDetailScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PartyDetailScreen
