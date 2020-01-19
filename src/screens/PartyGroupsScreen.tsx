import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { useGroups, useApplyGroup } from '../services/groups'
import { useStyles, MakeStyles } from '../services/design'
import { LoadingPage } from '../components/pages'
import { GroupCard } from '../components/organisms'
import { Group } from '../entities'
import { useAuthState } from '../store/hooks'
import { AddFab } from '../components/atoms'
import { showCreatePartyGroupAlreadyCreatedMessage } from '../services/flashCard'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const PartyGroupsScreen = ({ navigation }: Props) => {
  const styles = useStyles(makeStyles)
  const { uid } = useAuthState()
  const partyID = navigation.state.params.partyID
  const groups = useGroups(partyID)
  const [isCreatedGroup, setIsCreatedGroup] = useState<boolean>(false)

  useEffect(() => {
    if (!groups) return
    const _isCreatedGroup = groups.some(group => group.organizerUID === uid)

    setIsCreatedGroup(_isCreatedGroup)
  }, [groups, isCreatedGroup, uid])

  const onPressAddFab = useCallback(() => {
    if (isCreatedGroup) {
      showCreatePartyGroupAlreadyCreatedMessage()
      return
    }
    navigation.navigate('PartyMake', { partyID })
  }, [isCreatedGroup, navigation, partyID])
  const { onPressApplyGroup } = useApplyGroup()

  const FetchGroupsThumbnail = useCallback(
    (groups: Group[]) => {
      const thumbnailURLs = groups.map((group, index) => {
        const uri = group.thumbnailURL
        const groupID = group.id
        return (
          <View key={index} style={styles.thumbnailContainer}>
            <GroupCard
              thumbnailURL={uri}
              name={group.organizerName}
              width={width}
              isAppliedParty={group.appliedUIDs.includes(uid)}
              onPressEntry={() => {
                onPressApplyGroup(partyID, groupID, group)
              }}
              onPressDetail={() => {
                navigation.navigate('GroupDetail', { partyID, groupID })
              }}
            />
          </View>
        )
      })
      return thumbnailURLs
    },
    [navigation, onPressApplyGroup, partyID, styles.thumbnailContainer, uid]
  )

  if (!groups) {
    return <LoadingPage />
  }
  return (
    <View style={styles.container}>
      <ScrollView>{FetchGroupsThumbnail(groups)}</ScrollView>
      <View style={styles.entryButtonWrapper}>
        <AddFab size={fabNormalSize} onPress={onPressAddFab} />
      </View>
    </View>
  )
}

PartyGroupsScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

const { width } = Dimensions.get('window')
const materialMargin = 16
const fabNormalSize = 52

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
    },
    entryButtonWrapper: {
      position: 'absolute',
      right: materialMargin,
      bottom: materialMargin
    },
    entryText: {
      fontSize: 20,
      color: colors.foregrounds.onTintPrimary
    }
  })

export default PartyGroupsScreen
