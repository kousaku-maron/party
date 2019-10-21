import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { formatedDateMonthDateHour } from '../services/formatedDate'
import { colors } from '../themes'
import { RoundedButton } from '../components/atoms'
import { Modal } from '../components/organisms'
import { useModal } from '../services/modal'
import { entryParty, useParty } from '../services/party'
import { PartyDetailScreenState } from '../containers/PartyDetailScreen'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & PartyDetailScreenState

const PartyDetailScreen = (props: Props) => {
  const { navigation, auth } = props
  const partyID = navigation.state.params.partyID
  const party = useParty(partyID)
  const uid = auth.uid
  const modalTools = useModal()
  const onEntry = useCallback(async () => {
    await entryParty(uid, partyID)
    modalTools.onClose()
  }, [modalTools, partyID, uid])

  if (!party) {
    return <LoadingPage />
  }
  const uri = party.thumbnailURL
  const date = party.date
  const dateStr = formatedDateMonthDateHour(date)

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inner}>
          <Image style={[styles.image, { width: width }]} source={{ uri }} />
          <View style={styles.descriptionContainer}>
            <Text style={styles.areaText}>エリア: {party.name}</Text>
            <Text style={styles.dateText}>日時: {dateStr}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.entryButtonWrapper}>
        <RoundedButton color={colors.primary.main} fullWidth={true} height={48} padding={6} onPress={modalTools.onOpen}>
          <Text style={styles.entryButtonText}>参加</Text>
        </RoundedButton>
      </View>
      <Modal
        isVisible={modalTools.isVisible}
        title="本当に参加しますか？"
        desc="前日のドタキャンは評価を落としかねます"
        negative="キャンセル"
        positive="はい"
        onPositive={onEntry}
        onNegative={modalTools.onClose}
      />
    </View>
  )
}

PartyDetailScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})
const { width } = Dimensions.get('window')
const descriptionFontSize = 24

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: colors.inherit
  },
  inner: {
    display: 'flex',
    alignItems: 'center'
  },
  calender: {
    height: 60,
    width: 60,
    alignItems: 'center',
    backgroundColor: colors.primary.main
  },
  calenderMonth: {
    color: 'white',
    fontSize: 20
  },
  calenderDay: {
    color: 'white',
    fontSize: 25
  },
  titleTextWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  image: {
    height: (width / 16) * 9
  },
  descriptionContainer: {
    width,
    padding: 24
  },
  areaText: {
    fontSize: descriptionFontSize
  },
  dateText: {
    fontSize: descriptionFontSize,
    color: 'gray'
  },
  entryButtonWrapper: {
    position: 'absolute',
    width,
    paddingHorizontal: 24,
    bottom: 24
  },
  entryButtonText: {
    fontSize: 32,
    color: '#FFFFFF'
  }
})

export default PartyDetailScreen
