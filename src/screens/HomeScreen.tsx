import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties } from '../services/party'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps
const HomeScreen = (props: Props) => {
  const { navigation } = props
  const parties = useParties()

  const FetchPartiesThumbnail = parties => {
    const thumbnailURLs = parties.map((party, index) => {
      const uri = party.thumbnailURL
      return (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('PartyDetail')}
          style={styles.partyImageTouchable}
        >
          <Image source={{ uri }} style={styles.partyImage}></Image>
          <Text style={styles.partyText}>{party.name}</Text>
        </TouchableOpacity>
      )
    })
    return thumbnailURLs
  }

  if (!parties) {
    return <LoadingPage />
  }
  return <View style={styles.container}>{FetchPartiesThumbnail(parties)}</View>
}

HomeScreen.navigationOptions = () => ({
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
  partyImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1
  },
  partyImageTouchable: {
    width: '28%',
    height: '28%'
  },
  partyText: {
    textAlign: 'center',
    flexDirection: 'row'
  }
})

export default HomeScreen
