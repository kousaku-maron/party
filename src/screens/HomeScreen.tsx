import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useParties } from '../services/party'
import { LoadingPage } from '../components/pages'

const HomeScreen = () => {
  const parties = useParties()
  console.log('Post screen')

  const FetchPartiesThumbnail = parties => {
    const thumbnailURLs = parties.map((party, index) => {
      const uri = party.thumbnailURL
      return (
        <TouchableOpacity key={index} onPress={() => Alert.alert('Hello')} style={styles.areaImageTouchable}>
          <Image key={index} source={{ uri }} style={styles.areaImage}></Image>
          <Text key={index} style={{ justifyContent: 'center', flexDirection: 'row' }}>
            {party.name}
          </Text>
        </TouchableOpacity>
      )
    })
    return thumbnailURLs
  }

  if (!parties) {
    return <LoadingPage />
  }
  return (
    <View style={styles.container}>
      <Text>post screen</Text>
      {FetchPartiesThumbnail(parties)}
    </View>
  )
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
  areaImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    flex: 1
  },
  areaImageTouchable: {
    width: '28%',
    height: '28%'
  }
})

export default HomeScreen
