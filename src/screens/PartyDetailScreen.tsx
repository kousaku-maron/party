import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps

const PartyDetailScreen = (props: Props) => {
  const { navigation } = props
  const partyParams = navigation.state.params

  return (
    <View style={styles.container}>
      <Text>{partyParams.party.name}飲み！！</Text>
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
    alignItems: 'center',
    padding: 16
  }
})

export default PartyDetailScreen
