import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { useParties } from '../services/party'
import { useModal } from '../services/modal'
import { LoadingPage } from '../components/pages'
import { HomeScreenState } from '../containers/HomeScreen'
import { colors } from '../themes'
import { Card, GenderModal } from '../components/organisms'
import { checkGender, setGender } from '../services/user'
import { Party } from '../entities/Party'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps & HomeScreenState

const HomeScreen = (props: Props) => {
  const { auth } = props
  const parties = useParties()
  const modalTools = useModal()

  const [existGender, setExistGender] = useState<boolean>(false)
  useEffect(() => {
    const funcCheckGender = async () => {
      if (!auth || !auth.uid) return
      const { uid } = auth
      const resCheckGender = await checkGender(uid)
      setExistGender(resCheckGender)
    }
    funcCheckGender()
  }, [auth])

  const onSetGender = useCallback(
    async (uid, gender) => {
      await setGender(uid, gender)
      setExistGender(true)
      modalTools.onClose
    },
    [modalTools.onClose]
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
              onPressEntry={() => props.navigation.navigate('PartyEntry', { partyID })}
              onPressDetail={() => props.navigation.navigate('PartyDetail', { partyID })}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [props.navigation]
  )

  if (!parties) {
    return <LoadingPage />
  }
  return (
    <ScrollView>
      {FetchPartiesThumbnail(parties)}
      {auth && auth.uid && (
        <GenderModal
          isVisible={!existGender}
          uid={auth.uid}
          title="あなたの性別は何ですか？"
          negative="キャンセル"
          positive="登録します"
          onPositive={(uid, gender) => {
            onSetGender(uid, gender)
          }}
          onNegative={modalTools.onClose}
        />
      )}
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
