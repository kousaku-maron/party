import React, { useCallback, useMemo } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { useSafeArea } from 'react-native-safe-area-context'
import { RouteParams } from '../navigators/RouteProps'
import { useAuthState } from '../store/hooks'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUser } from '../services/user'
import { useParty } from '../services/party'
import { useGroup } from '../services/groups'
import { Thumbnail, Fab, ShadowBase, RoundedButton } from '../components/atoms'
import { LoadingPage } from '../components/pages'

const MatchingScreen = () => {
  const inset = useSafeArea()
  const route = useRoute<RouteProp<RouteParams, 'Matching'>>()
  const { uid, user } = useAuthState()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const targetUserID = useMemo(() => {
    if (route.params?.userID) {
      return route.params.userID
    }
    return uid
  }, [route.params, uid])

  const partyID = useMemo(() => {
    if (route.params?.partyID) {
      return route.params.partyID
    }
    return uid
  }, [route.params, uid])

  const groupID = useMemo(() => {
    if (route.params?.groupID) {
      return route.params.groupID
    }
    return uid
  }, [route.params, uid])

  const targetUser = useUser(targetUserID)
  const party = useParty(partyID)
  const group = useGroup(partyID, groupID)

  const onPressHello = useCallback(() => {
    console.log('Hello')
  }, [])

  const onPressClose = useCallback(() => {
    console.log('Close')
  }, [])

  //MEMO: ThumnailURLないとき
  if (!targetUser || !group || !party || !party.thumbnailURL) {
    return <LoadingPage />
  }

  return (
    <ImageBackground
      source={{ uri: party.thumbnailURL }}
      blurRadius={10}
      style={[styles.container, { paddingTop: inset.top }]}
    >
      <View style={styles.partyDescriptionArea}>
        <View style={styles.partyDescriptionContainer}>
          <View style={styles.partyTitleTextWrapper}>
            <Text style={styles.partyTitleText}>{party.name}</Text>
          </View>
          <View style={styles.partyAreaTextWrapper}>
            <Text style={styles.partyAreaText}>東京エリア</Text>
          </View>
        </View>

        <View style={styles.matchingContainer}>
          <View style={styles.thumbnailWrapper}>
            <ShadowBase>
              <Thumbnail uri={user.thumbnailURL} size={100} />
            </ShadowBase>
          </View>

          {/* ここに，乾杯のアイコンを入れる*/}
          <View style={styles.glassWrapper}>
            <Fab size={64} />
          </View>

          <View style={styles.thumbnailWrapper}>
            <ShadowBase>
              <Thumbnail uri={targetUser.thumbnailURL} size={100} />
            </ShadowBase>
          </View>
        </View>

        <View style={styles.actionTextWrapper}>
          <Text style={styles.actionText}>ともだちが見つかりました！</Text>
        </View>
      </View>

      <View style={styles.actionArea}>
        <View style={styles.helloButtonWrapper}>
          <ShadowBase>
            <RoundedButton color={colors.tints.primary.main} width={240} height={50} onPress={onPressHello}>
              <Text style={styles.helloText}>あいさつする</Text>
            </RoundedButton>
          </ShadowBase>
        </View>

        <View style={styles.closeButtonWrapper}>
          <TouchableOpacity
            style={{ width: 240, height: 50, alignItems: 'center', justifyContent: 'center' }}
            onPress={onPressClose}
          >
            <Text style={styles.closeText}>とじる</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative'
    },
    partyDescriptionArea: {
      width: '100%'
    },
    partyDescriptionContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 74
    },
    glassWrapper: {
      width: 105,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red '
    },
    actionArea: {
      width: '100%',
      justifyContent: 'center'
    },
    helloButtonWrapper: {
      color: colors.foregrounds.onTintPrimary,
      paddingVertical: 9,
      justifyContent: 'center',
      alignItems: 'center'
    },
    closeButtonWrapper: {
      color: colors.foregrounds.onTintPrimary,
      paddingVertical: 9,
      justifyContent: 'center',
      alignItems: 'center'
    },
    partyTitleText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 22
    },
    partyAreaText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 14
    },
    actionTextWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 169
    },
    matchingContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    actionText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 18
    },
    closeText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 16
    },
    helloText: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 16
    },
    thumbnailWrapper: {},
    partyTitleTextWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6
    },
    partyAreaTextWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 6
    }
  })

export default MatchingScreen
