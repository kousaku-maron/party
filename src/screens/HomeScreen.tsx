import React, { useState, useCallback } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Image, Button, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties, formatedDate, applyParty } from '../services/party'
import { LoadingPage } from '../components/pages'
import ApplyModal from '../components/organisms/ApplyModal'
import { HomeScreenState } from '../containers/HomeScreen'
import { colors } from '../themes'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & HomeScreenState

const HomeScreen = (props: Props) => {
  const { navigation, auth } = props
  const { uid } = auth
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
          <View style={styles.imageBorderRadius}>
            <Image style={styles.image} source={{ uri }} />
          </View>
          <View style={styles.description}>
            <View>
              <Text style={styles.name}>{party.name}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.Button}>
                <Button
                  title="詳細"
                  color={colors.primary.dark}
                  onPress={() => navigation.navigate('PartyDetail', { pid })}
                />
              </View>
              <View style={styles.Button}>
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
                  buttonColor={colors.primary.dark}
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
    padding: 10
  },
  imageBorderRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: width,
    height: 200
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
    backgroundColor: colors.primary.main,
    height: 80,
    justifyContent: 'space-between',
    padding: 6,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: 'hidden'
  },
  buttonContainer: {
    flexDirection: 'column'
  },
  Button: {
    height: 30,
    width: 80,
    backgroundColor: '#FFFFFF',
    margin: 3,
    borderRadius: 10
  }
})

export default HomeScreen
