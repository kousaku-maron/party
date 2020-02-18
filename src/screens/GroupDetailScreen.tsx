import React, { useCallback } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'
import { RouteParams } from '../navigators/RouteProps'
import { useStyles, MakeStyles } from '../services/design'
import { LoadingPage } from '../components/pages'
import { MembersCard } from '../components/organisms'
import { User } from '../entities'
import { useMembers } from '../services/members'

const GroupDetailScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'GroupDetail'>>()
  const styles = useStyles(makeStyles)
  const partyID = route.params.partyID
  const groupID = route.params.groupID
  const members = useMembers(partyID, groupID)

  const FetchMembersThumbnail = useCallback(
    (members: User[]) => {
      const thumbnailURLs = members.map((member, index) => {
        const uri = member.thumbnailURL
        return (
          <View key={index} style={styles.thumbnailContainer}>
            <MembersCard name={member.name} thumbnailURL={uri} width={width} />
          </View>
        )
      })
      return thumbnailURLs
    },
    [styles.thumbnailContainer]
  )

  if (!members) {
    return <LoadingPage />
  }
  return (
    <View style={styles.container}>
      <ScrollView>{FetchMembersThumbnail(members)}</ScrollView>
    </View>
  )
}

const { width } = Dimensions.get('window')

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      backgroundColor: colors.backgrounds.primary
    },
    thumbnailContainer: {
      width: width,
      padding: 10,
      backgroundColor: colors.backgrounds.primary
    }
  })

export default GroupDetailScreen
