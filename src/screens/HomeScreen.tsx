import React, { useState, useCallback } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties, applyParty } from '../services/party'
import { useModal } from '../services/modal'
import { LoadingPage } from '../components/pages'
import { HomeScreenState } from '../containers/HomeScreen'
import { colors } from '../themes'
import { Modal, Card } from '../components/organisms'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & HomeScreenState

const HomeScreen = (props: Props) => {
  const { navigation, auth } = props
  const { uid } = auth
  const parties = useParties()
  const [statepartyID, setStatepartyID] = useState<string>()
  const modalTools = useModal()
  const onOpen = useCallback(
    partyID => {
      modalTools.onOpen()
      setStatepartyID(partyID)
    },
    [modalTools]
  )

  const onApply = useCallback(
    uid => {
      applyParty(uid, statepartyID)
      modalTools.onClose()
    },
    [modalTools, statepartyID]
  )

  const FetchPartiesThumbnail = parties => {
    const thumbnailURLs = parties.map((party, index) => {
      const uri = party.thumbnailURL
      const partyID = party.id

      return (
        <View key={index} style={styles.container}>
          <Card
            uri={{ uri }}
            name={party.name}
            date={party.date.toDate()}
            width={width}
            navigation={navigation}
            onPressApply={() => {
              onOpen(partyID)
            }}
            onPressDetail={() => props.navigation.navigate('PartyDetail', { partyID })}
          ></Card>
          <Modal
            isVisible={modalTools.isVisible}
            title="本当に参加しますか？"
            desc="前日のドタキャンは評価を落としかねます"
            negative="キャンセル"
            positive="はい"
            onPositive={() => {
              onApply(uid)
            }}
            onNegative={modalTools.onClose}
          ></Modal>
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
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: 'hidden'
  },
  image: {
    width: width,
    height: 200
  },
  name: {
    color: 'white',
    fontSize: 25,
    padding: 6,
    fontWeight: 'bold'
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
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    overflow: 'hidden'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttonWrapper: {
    padding: 3
  },
  buttonText: {
    fontSize: 18,
    color: colors.primary.dark
  }
})

export default HomeScreen
