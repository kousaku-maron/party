import React, { useCallback } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { formatedDateMonthDateHour } from '../services/formatedDate'
import { colors } from '../themes'
import { RoundedButton } from '../components/atoms'
import { Modal } from '../components/organisms'
import { useModal } from '../services/modal'
import { applyParty } from '../services/party'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps

const PartyDetailScreen = (props: Props) => {
  const { navigation } = props
  const partyParams = navigation.state.params.party
  const uid = navigation.state.params.uid
  const date = partyParams.date.toDate()
  const dateStr = formatedDateMonthDateHour(date)
  const uri = partyParams.thumbnailURL
  const modalTools = useModal()

  const onApply = useCallback(async () => {
    await applyParty(uid, partyParams.id)
    modalTools.onClose()
  }, [modalTools, partyParams.id, uid])

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <View style={styles.calender}>
            <Text style={styles.calenderMonth}>{date.getMonth() + 1}月</Text>
            <Text style={styles.calenderDay}>{date.getDay()}</Text>
          </View>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.titleText}>{partyParams.name}飲み！！</Text>
          </View>
        </View>
        <Image style={[styles.image, { width: width }]} source={{ uri }} />
        <View style={styles.descriptionContainer}>
          <Text style={styles.areaText}>エリア: {partyParams.name}</Text>
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
