import React, { useCallback } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { useParties } from '../services/party'
import { useModal } from '../services/modal'
import { useStyles, MakeStyles } from '../services/design'
import { useAuthState } from '../store/hooks'
import { LoadingPage } from '../components/pages'
import { Card, GenderModal, Modal } from '../components/organisms'
import { setGender } from '../services/user'
import { Party } from '../entities/Party'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const HomeScreen = ({ navigation }: Props) => {
  const styles = useStyles(makeStyles)
  const auth = useAuthState()
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

  // TODO: PartyEntryScreenで閉じれるものは閉じた方が良いので、PartyEntryScreenで定義して使用する。
  // const onPressEntry = useCallback(
  //   partyID => {
  //     if (!user) return
  //     if (!user.isAccepted) {
  //       return isAcceptedModalTools.onOpen()
  //     }
  //     if (!user.gender) {
  //       return genderModalTools.onOpen()
  //     }
  //     navigation.navigate('PartyEntry', { partyID })
  //   },
  //   [genderModalTools, isAcceptedModalTools, navigation, user]
  // )

  const onPressEntryForDemo = useCallback(
    partyID => {
      if (!user) return

      navigation.navigate('Chat', { roomID: partyID })
    },
    [navigation, user]
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
                onPressEntryForDemo(partyID)
              }}
              // TODO: PartyEntryScreenで閉じれるものは閉じた方が良いので、PartyEntryScreenで定義して使用する。
              onPressDetail={() => navigation.navigate('PartyDetail', { partyID, onPressEntry: onPressEntryForDemo })}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [navigation, onPressEntryForDemo, styles.container]
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

HomeScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

const { width } = Dimensions.get('window')

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: width,
      padding: 10,
      backgroundColor: colors.backgrounds.primary
    }
  })

export default HomeScreen
