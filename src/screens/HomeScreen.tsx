import React, { useState, useCallback } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Image, Button, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties, formatedDate, applyParty } from '../services/party'
import { LoadingPage } from '../components/pages'
import ApplyModal from '../components/organisms/ApplyModal'
import { HomeScreenState } from '../containers/HomeScreen'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & HomeScreenState

const HomeScreen = (props: Props) => {
  const { navigation, auth } = props
  const { uid } = auth
  //console.info(props)
  //const uid = '6ULPQIhKjVhziUM5B7ETSi1HRL82'
  const parties = useParties()
  const [isModal, setIsModal] = useState<boolean>(false)
  const onOpen = useCallback(() => {
    setIsModal(true)
  }, [])
  const onClose = useCallback(() => {
    setIsModal(false)
  }, [])
  const onApply = useCallback((uid, pid) => {
    applyParty(uid, pid)
    setIsModal(false)
  }, [])

  const FetchPartiesThumbnail = parties => {
    const thumbnailURLs = parties.map((party, index) => {
      const uri = party.thumbnailURL
      const pid = party.uid
      const fetcDate = party.date.toDate()
      const date = formatedDate(fetcDate)

      return (
        <View key={index} style={styles.container}>
          <Image style={styles.image} source={{ uri }} />
          <View style={styles.description}>
            <View>
              <Text style={styles.name}>{party.name}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <Button title="詳細" color="#FF9999" onPress={() => navigation.navigate('PartyDetail', { pid })} />
              </View>
              <View style={styles.buttonContainer}>
                <ApplyModal
                  isModal={isModal}
                  navigation={navigation}
                  onOpen={onOpen}
                  onClose={onClose}
                  onApply={() => {
                    onApply(party.uid, uid)
                  }}
                  title={'参加'}
                  uid={uid}
                  pid={party.uid}
                />
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
    width: width,
    // height: 400,
    //flexDirection: 'row',
    paddingBottom: 12
  },
  image: {
    width: width,
    height: 200,
    backgroundColor: 'red'
  },
  name: {
    color: 'white',
    fontSize: 20,
    padding: 6
  },
  date: {
    color: 'white',
    padding: 6
  },
  description: {
    //flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignSelf: 'flex-end',
    height: 80,
    width: width,
    padding: 6,
    flexDirection: 'row'
  },
  buttonsContainer: {
    alignItems: 'flex-end',
    flex: 1,
    flexDirection: 'column'
  },
  buttonContainer: {
    height: 30,
    width: 80,
    backgroundColor: '#FFFFFF',
    padding: 3,
    borderRadius: 10
  }
})

export default HomeScreen
