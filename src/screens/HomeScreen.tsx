import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, View, Text, Dimensions } from 'react-native'
import { useStackNavigation } from '../services/route'
import { useSafeArea } from 'react-native-safe-area-context'
import Carousel from 'react-native-snap-carousel'
import { Party } from '../entities'
import { usePartiesByTags } from '../services/party'
import { useModal } from '../services/modal'
import { useStyles, MakeStyles } from '../services/design'
import { useAppAuthState } from '../store/hooks'
import { ShadowBase } from '../components/atoms'
import { Modal } from '../components/moleculers'
import { BottomTabLayout } from '../components/templates'
import { PartyPrimaryCard, PartySecondaryCard, GenderModal } from '../components/organisms'
import { setGender } from '../services/user'

const homeTags = ['home']
const popularTags = ['popular']

const HomeScreen = () => {
  const { top: insetTop, bottom: insetBottom } = useSafeArea()
  const navigation = useStackNavigation()
  const styles = useStyles(makeStyles)
  const { user, uid } = useAppAuthState()

  const { fetching: fetchingHome, parties: homeParties } = usePartiesByTags(homeTags)
  const { fetching: fetchingPopular, parties: popularParties } = usePartiesByTags(popularTags)

  const genderModalTools = useModal()
  const isAcceptedModalTools = useModal()

  const onPressParty = useCallback(
    ({ type }: Party) => {
      navigation.push('SwipeCard', { type })
    },
    [navigation]
  )

  const [isSendGender, setIsSendGender] = useState<boolean>(false)
  const onSetGender = useCallback(
    async (uid, gender) => {
      await setGender(uid, gender)
      genderModalTools.onClose()
    },
    [genderModalTools]
  )

  useEffect(() => {
    if (!user || isSendGender) return
    if (!user.gender) {
      genderModalTools.onOpen()
      setIsSendGender(true)
    }
  }, [genderModalTools, isSendGender, user])

  const renderItem = useCallback(
    ({ item }: { item: Party }) => {
      return (
        <ShadowBase intensity={2}>
          <PartyPrimaryCard key={item.id} party={item} users={item.users ?? []} onPress={onPressParty} />
        </ShadowBase>
      )
    },
    [onPressParty]
  )

  return (
    <BottomTabLayout fetching={fetchingHome || fetchingPopular}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={[styles.scrollView, { paddingTop: insetTop + 24, paddingBottom: insetBottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.parimaryTitleTextWrapper}>
            {!fetchingPopular && <Text style={styles.parimaryTitleText}>人気</Text>}
          </View>
          <Carousel
            data={popularParties}
            renderItem={renderItem}
            itemWidth={320 + 20} // MEMO: add 30px margin
            activeSlideAlignment={'start'}
            sliderWidth={Dimensions.get('window').width}
            slideStyle={{ paddingLeft: 24 }}
            inactiveSlideOpacity={0.7}
          />

          {/* MEMO: カルーセル自体にcssを設定したくなかったので、別コンポーネントでレイアウト調整している */}
          <View style={styles.carouselBottomSpace} />

          <View style={styles.secondaryTitleTextWrapper}>
            {!fetchingHome && <Text style={styles.secondaryTitleText}>すべて</Text>}
          </View>

          <View style={styles.allPartiesWrapper}>
            {homeParties.map(party => (
              <View key={party.id} style={styles.secondaryCardWrapper}>
                <ShadowBase>
                  <PartySecondaryCard
                    party={party}
                    width={Dimensions.get('window').width * 0.4}
                    height={Dimensions.get('window').width * 0.55}
                    onPress={onPressParty}
                  />
                </ShadowBase>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

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
        desc={'本人確認中です。\n承認されるまでお待ちください。'}
        negative="戻る"
        positive="OK"
        onPositive={isAcceptedModalTools.onClose}
        onNegative={isAcceptedModalTools.onClose}
      />
    </BottomTabLayout>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.backgrounds.primary,
      width: '100%',
      height: '100%'
    },
    indicatorContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgrounds.primary,
      width: '100%',
      height: '100%'
    },
    scrollView: {
      display: 'flex',
      width: '100%'
    },
    parimaryTitleTextWrapper: {
      width: '100%',
      paddingBottom: 48
    },
    secondaryTitleTextWrapper: {
      width: '100%',
      paddingBottom: 48
    },
    allPartiesWrapper: {
      width: '100%',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24
    },
    secondaryCardWrapper: {
      paddingBottom: 24
    },
    parimaryTitleText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.foregrounds.primary,
      paddingLeft: 24
    },
    secondaryTitleText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.foregrounds.primary,
      paddingLeft: 24
    },
    carouselBottomSpace: {
      paddingBottom: 60
    }
  })

export default HomeScreen
