import React, { useCallback } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { useGroups } from '../services/groups'
import { useStyles, MakeStyles } from '../services/design'
import { onApplyGroup } from '../services/groups'
import { LoadingPage } from '../components/pages'
import { GroupCard } from '../components/organisms'
import { Group } from '../entities'
import { useAuthState } from '../store/hooks'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const PartyGroupsScreen = ({ navigation }: Props) => {
  const styles = useStyles(makeStyles)

  const { uid } = useAuthState()

  const partyID = navigation.state.params.partyID
  const groups = useGroups(partyID)

  const FetchGroupsThumbnail = useCallback(
    (groups: Group[]) => {
      const thumbnailURLs = groups.map((group, index) => {
        const uri = group.thumbnailURL
        const groupID = group.id

        return (
          <View key={index} style={styles.container}>
            <GroupCard
              thumbnailURL={{ uri }}
              name={group.organizerName}
              width={width}
              isAppliedParty={group.appliedUIDs.includes(uid)}
              onPressEntry={() => {
                onApplyGroup(partyID, groupID, group, uid)
              }}
              //TODO: パーティーメンバーの詳細表示作成予定
              onPressDetail={() => {
                console.log('パーティーメンバーの詳細表示作成予定')
              }}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [partyID, styles.container, uid]
  )

  if (!groups) {
    return <LoadingPage />
  }
  return <ScrollView>{FetchGroupsThumbnail(groups)}</ScrollView>
}

PartyGroupsScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

const { width } = Dimensions.get('window')

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: width,
      padding: 10,
      backgroundColor: colors.backgrounds.primary
    }
  })

export default PartyGroupsScreen
