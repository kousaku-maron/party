import React from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
// import { EntryParty } from '../entities'
import { PartyEntryScreenState } from '../containers/PartyEntryScreen'
import { colors } from '../themes'
// import * as UserRepository from '../repositories/user'
import { View, Text, StyleSheet } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'
// import { Thumbnail } from '../components/atoms'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & PartyEntryScreenState

const PartyEntryScreen = (props: Props) => {
  const { navigation } = props
  // const { uid } = auth

  return (
    <View style={styles.container}>
      <Text>{navigation.getParam('partyID')}</Text>
    </View>
  )
}

PartyEntryScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null
})

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.inherit
  }
})

export default PartyEntryScreen
