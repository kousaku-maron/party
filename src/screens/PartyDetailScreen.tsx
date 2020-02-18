import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RouteParams } from '../navigators/RouteProps'
import { formatedDateMonthDateHour } from '../services/formatedDate'
import { RoundedButton } from '../components/atoms'
import { useParty } from '../services/party'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { LoadingPage } from '../components/pages'

const PartyDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'PartyDetail'>>()
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const partyID = route.params.partyID
  const party = useParty(partyID)

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
        <RoundedButton color={colors.tints.primary.main} fullWidth={true} height={48} padding={6}>
          <Text style={styles.entryButtonText}>参加</Text>
        </RoundedButton>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window')
const descriptionFontSize = 24

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: colors.backgrounds.primary
    },
    inner: {
      display: 'flex',
      alignItems: 'center'
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
      fontSize: descriptionFontSize,
      color: colors.foregrounds.primary
    },
    dateText: {
      fontSize: descriptionFontSize,
      color: colors.foregrounds.secondary
    },
    entryButtonWrapper: {
      position: 'absolute',
      width,
      paddingHorizontal: 24,
      bottom: 24
    },
    entryButtonText: {
      fontSize: 32,
      color: colors.foregrounds.onTintPrimary
    }
  })

export default PartyDetailScreen
