import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { formatedDateMonthDateHour } from '../services/formatedDate'
import { colors } from '../themes'
import { RoundedButton } from '../components/atoms'
import { Modal } from '../components/organisms'
import { useModal } from '../services/modal'
import { applyParty, useParty } from '../services/party'
import { PartyDetailScreenState } from '../containers/PartyDetailScreen'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & PartyDetailScreenState

const PartyDetailScreen = (props: Props) => {
  const { navigation, auth } = props
  const partyID = navigation.state.params.partyID
  const party = useParty(partyID)
  const uid = auth.uid
  const date = party.date
  const dateStr = formatedDateMonthDateHour(date)
  const uri = party.thumbnailURL
  const modalTools = useModal()

  const onApply = useCallback(async () => {
    await applyParty(uid, party.id)
    modalTools.onClose()
  }, [modalTools, party.id, uid])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <View style={styles.calender}>
            <Text style={styles.calenderMonth}>{date.getMonth() + 1}月</Text>
            <Text style={styles.calenderDay}>{date.getDay()}</Text>
          </View>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.titleText}>{party.name}飲み！！</Text>
          </View>
        </View>
        <Image style={[styles.image, { width: width }]} source={{ uri }} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.areaText}>エリア: {party.name}</Text>
          <Text style={styles.dateText}>日時: {dateStr}</Text>
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          color={colors.primary.main}
          fullWidth={false}
          width={140}
          height={60}
          padding={6}
          onPress={modalTools.onOpen}
        >
          <Text style={styles.buttonText}>参加</Text>
        </RoundedButton>
      </View>
      <Modal
        isVisible={modalTools.isVisible}
        title="本当に参加しますか？"
        desc="前日のドタキャンは評価を落としかねます"
        negative="キャンセル"
        positive="はい"
        onPositive={onApply}
        onNegative={modalTools.onClose}
      />
    </View>
  )
}

PartyDetailScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca'
})
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60
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
  titleText: {
    fontSize: 50
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
    width: width,
    padding: 64
  },
  areaText: {
    fontSize: 30
  },
  dateText: {
    fontSize: 30
  },
  buttonWrapper: {
    width: width,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 32,
    color: '#FFFFFF'
  }
})

export default PartyDetailScreen
