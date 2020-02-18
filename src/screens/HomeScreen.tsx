import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useParties, useEntryDemoRoom } from '../services/party'
import { useModal } from '../services/modal'
import { useStyles, MakeStyles } from '../services/design'
import { useAuthState } from '../store/hooks'
import { LoadingPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'
import { Card, GenderModal, Modal } from '../components/organisms'
import { setGender } from '../services/user'
import { Party } from '../entities/Party'

const HomeScreen = () => {
  const navigation = useNavigation()
  const styles = useStyles(makeStyles)
  const { user, uid } = useAuthState()

  const parties = useParties()
  const { onPressEntryDemoRoom } = useEntryDemoRoom()
  const genderModalTools = useModal()
  const isAcceptedModalTools = useModal()

  const [isSendGender, setIsSendGender] = useState<boolean>(false)
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

  useEffect(() => {
    if (!user || isSendGender) return
    if (!user.gender) {
      genderModalTools.onOpen()
      setIsSendGender(true)
    }
  }, [genderModalTools, isSendGender, user])

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
                onPressEntryDemoRoom(party)
              }}
              // TODO: PartyEntryScreenで閉じれるものは閉じた方が良いので、PartyEntryScreenで定義して使用する。
              onPressDetail={() => navigation.navigate('PartyDetail', { partyID, onPressEntry: onPressEntryDemoRoom })}
              onPressGroups={() => navigation.navigate('PartyGroups', { partyID })}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [navigation, onPressEntryDemoRoom, styles.container]
  )
  if (!parties) {
    return <LoadingPage />
  }
  return (
    <BottomTabLayout>
      <ScrollView>
        {FetchPartiesThumbnail(parties)}
        <GenderModal
          isVisible={genderModalTools.isVisible}
          uid={uid}
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
    </BottomTabLayout>
  )
}

const { width } = Dimensions.get('window')

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width,
      padding: 10,
      backgroundColor: colors.backgrounds.primary
    }
  })

export default HomeScreen
