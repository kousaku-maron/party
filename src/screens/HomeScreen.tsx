import React from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Image, Button, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties } from '../services/party'
import { LoadingPage } from '../components/pages'
import ApplyModal from '../components/atoms/ApplyModal'

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
      const uid = party.uid
      const fetcDate = party.date.toDate()
      const date = `${fetcDate.getFullYear()}年${fetcDate.getMonth() +
        1}月${fetcDate.getDay()}日${fetcDate.getHours()}:${('0' + fetcDate.getMinutes()).slice(-2)}`

      return (
        <View key={index} style={{ width: width, height: 200, flexDirection: 'row', margin: 24 }}>
          <Image style={styles.image} source={{ uri }} />
          <View style={styles.description}>
            <View style={styles.descriptionTextPosition}>
              <View>
                <Text style={styles.name}>{party.name}</Text>
                <Text style={styles.date}>{date}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                  <Button title="詳細" color="#FF9999" onPress={() => navigation.navigate('PartyDetail', { uid })} />
                </View>
                <View style={styles.buttonContainer}>
                  <ApplyModal navigation={navigation} title="申請" />
                </View>
              </View>
            </View>
          </View>
        </View>
      )
    })
    return thumbnailURLs
  }

  if (!parties) {
    return <LoadingPage />
  }
  return <ScrollView>{FetchPartiesThumbnail(parties)}</ScrollView>
}

HomeScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 300,
    height: 200,
    position: 'absolute'
  },
  name: {
    color: 'white',
    fontSize: 20,
    margin: 6
  },
  date: {
    color: 'white',
    margin: 6
  },
  description: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end'
  },
  descriptionTextPosition: {
    flexDirection: 'row'
  },
  buttonsContainer: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    paddingRight: 40
  },
  buttonContainer: {
    height: 30,
    width: 80,
    backgroundColor: '#FFFFFF',
    margin: 3,
    borderRadius: 10
  }
})

export default HomeScreen
