import React, { useState, useCallback } from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Image, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties, applyParty } from '../services/party'
import { formatedDate } from '../services/formatedDate'
import { useModal } from '../services/modal'
import { LoadingPage } from '../components/pages'
import ApplyModal from '../components/organisms/ApplyModal'
import RoundedButton from '../components/atoms/RoundedButton'
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
  const [statePartyId, setStatePartyId] = useState<string>()
  const modalTools = useModal()
  const onOpen = useCallback(
    partyId => {
      modalTools.onOpen()
      setStatePartyId(partyId)
    },
    [modalTools]
  )

  const onApply = useCallback(
    uid => {
      applyParty(uid, statePartyId)
      modalTools.onClose()
    },
    [modalTools, statePartyId]
  )

  const FetchPartiesThumbnail = parties => {
    const thumbnailURLs = parties.map((party, index) => {
      const uri = party.thumbnailURL
      const partyId = party.id
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
              <View style={styles.buttonWrapper}>
                <RoundedButton
                  color={'#FFFFFF'}
                  fullWidth={false}
                  width={70}
                  height={30}
                  padding={6}
                  onPress={() => navigation.navigate('PartyDetail', { partyId })}
                >
                  <Text style={styles.buttonText}>詳細</Text>
                </RoundedButton>
              </View>
              <View style={styles.buttonWrapper}>
                <RoundedButton
                  color={'#FFFFFF'}
                  fullWidth={false}
                  width={70}
                  height={30}
                  padding={6}
                  onPress={() => {
                    onOpen(partyId)
                  }}
                >
                  <ApplyModal
                    isVisible={modalTools.isVisible}
                    title="本当に参加しますか？"
                    desc="前日のドタキャンは評価を落としかねます"
                    negative="キャンセル"
                    positive="はい"
                    uid={uid}
                    partyId={partyId}
                    onApply={onApply}
                    onClose={modalTools.onClose}
                  ></ApplyModal>

                  <Text style={styles.buttonText}>参加</Text>
                </RoundedButton>
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
