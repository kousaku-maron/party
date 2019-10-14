import React from 'react'
import { Text, StyleSheet, Dimensions, ScrollView, Image, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties } from '../services/party'
import { formatedDate } from '../services/formatedDate'
import { LoadingPage } from '../components/pages'
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
              <RoundedButton
                color={'#FFFFFF'}
                fullWidth={false}
                width={70}
                height={30}
                padding={6}
                margin={3}
                onPress={() => navigation.navigate('PartyDetail', { partyId })}
              >
                <Text style={styles.buttonText}>詳細</Text>
              </RoundedButton>
              <RoundedButton
                color={'#FFFFFF'}
                fullWidth={false}
                width={70}
                height={30}
                padding={6}
                margin={3}
                onPress={() => onApply(uid, partyId)}
              >
                <Text style={styles.buttonText}>参加</Text>
              </RoundedButton>
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
    flexDirection: 'column'
  },
  button: {
    height: 30,
    width: 70,
    backgroundColor: '#FFFFFF',
    margin: 3,
    borderRadius: 40
  },
  buttonText: {
    fontSize: 18,
    color: colors.primary.dark
  }
})

export default HomeScreen
