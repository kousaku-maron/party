import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, ScrollView } from 'react-native'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { formatedDateMonthDateHour } from '../services/formatedDate'
import { RoundedButton } from '../components/atoms'
import { useParty } from '../services/party'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { PartyDetailScreenState } from '../containers/PartyDetailScreen'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}
type Props = OwnProps & PartyDetailScreenState

const PartyDetailScreen = (props: Props) => {
  const { navigation } = props

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const partyID = navigation.state.params.partyID
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
        <RoundedButton
          color={colors.tints.primary.main}
          fullWidth={true}
          height={48}
          padding={6}
          onPress={() => props.navigation.navigate('PartyEntry', { partyID })}
        >
          <Text style={styles.entryButtonText}>参加</Text>
        </RoundedButton>
      </View>
    </View>
  )
}

PartyDetailScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

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
