import React, { useCallback } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties } from '../services/party'
import { useModal } from '../services/modal'
import { LoadingPage } from '../components/pages'
import { HomeScreenState } from '../containers/HomeScreen'
import { colors } from '../themes'
import { Card, GenderModal, Modal } from '../components/organisms'
import { setGender } from '../services/user'
import { Party } from '../entities/Party'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps & HomeScreenState

const HomeScreen = (props: Props) => {
  const { auth } = props
  const { user } = auth
  const parties = useParties()

  const genderModalTools = useModal()
  const isAcceptedModalTools = useModal()

  const onSetGender = useCallback(
    async (uid, gender) => {
      await setGender(uid, gender)
      genderModalTools.onClose()
    },
    [genderModalTools]
  )

  const onPressEntry = useCallback(
    partyID => {
      if (!user) return
      if (!user.isAccepted) {
        return isAcceptedModalTools.onOpen()
      }
      if (!user.gender) {
        return genderModalTools.onOpen()
      }
      props.navigation.navigate('PartyEntry', { partyID })
    },
    [genderModalTools, isAcceptedModalTools, props.navigation, user]
  )

  const FetchPartiesThumbnail = useCallback(
    (parties: Party[]) => {
      const thumbnailURLs = parties.map((party, index) => {
        const uri = party.thumbnailURL
        const partyID = party.id

        return (
          <View key={index} style={styles.container}>
            <Card
              uri={{ uri }}
              name={party.name}
              date={party.date}
              width={width}
              onPressEntry={() => {
                onPressEntry(partyID)
              }}
              onPressDetail={() => props.navigation.navigate('PartyDetail', { partyID, onPressEntry })}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [onPressEntry, props.navigation]
  )

  if (!parties) {
    return <LoadingPage />
  }
  return (
    <ScrollView>
      {FetchPartiesThumbnail(parties)}
      <GenderModal
        isVisible={genderModalTools.isVisible}
        uid={auth.uid}
        title="あなたの性別は何ですか？"
        negative="キャンセル"
        positive="登録します"
        onPositive={(uid, gender) => {
          onSetGender(uid, gender)
        }}
        onNegative={genderModalTools.onClose}
      />
      <Modal
        isVisible={isAcceptedModalTools.isVisible}
        title={'本人確認中です。\n承認されるまでお待ちください。'}
        negative="戻る"
        positive="OK"
        onPositive={isAcceptedModalTools.onClose}
        onNegative={isAcceptedModalTools.onClose}
      />
    </ScrollView>
  )
}

HomeScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null,
  headerTintColor: colors.tertiary.light,
  headerStyle: {
    backgroundColor: colors.senary.dark
  }
})

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: width,
    padding: 10,
    backgroundColor: colors.inherit
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
