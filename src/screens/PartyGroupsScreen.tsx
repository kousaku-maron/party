import React, { useCallback, useState } from 'react'
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native'
import { NavigationStackProp, NavigationStackScreenProps } from 'react-navigation-stack'
import { headerNavigationOptions } from '../navigators/options'
import { useGroups, onApplyGroup } from '../services/groups'
import { useStyles, MakeStyles } from '../services/design'
import { LoadingPage } from '../components/pages'
import { GroupCard } from '../components/organisms'
import { Group } from '../entities'
import { useAuthState } from '../store/hooks'
import { CirclePlusFab } from '../components/atoms'

type OwnProps = { navigation: NavigationStackProp }
type Props = OwnProps

const PartyGroupsScreen = ({ navigation }: Props) => {
  const styles = useStyles(makeStyles)

  const { uid } = useAuthState()

  const partyID = navigation.state.params.partyID
  const groups = useGroups(partyID)

  const [isCreatedGroup, setIsCreatedGroup] = useState<boolean>(false)

  const FetchGroupsThumbnail = useCallback(
    (groups: Group[]) => {
      const thumbnailURLs = groups.map((group, index) => {
        const uri = group.thumbnailURL
        const groupID = group.id
        if (group.organizerUID === uid && isCreatedGroup === false) {
          setIsCreatedGroup(true)
        }
        return (
          <View key={index} style={styles.thumbnailContainer}>
            <GroupCard
              thumbnailURL={{ uri }}
              name={group.organizerName}
              width={width}
              isAppliedParty={group.appliedUIDs.includes(uid)}
              onPressEntry={() => {
                onApplyGroup(uid, partyID, groupID, group)
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
    [isCreatedGroup, partyID, styles.thumbnailContainer, uid]
  )

  if (!groups) {
    return <LoadingPage />
  }
  return (
    <View style={styles.container}>
      <ScrollView>{FetchGroupsThumbnail(groups)}</ScrollView>
      <View style={styles.entryButtonWrapper}>
        <CirclePlusFab
          disabled={isCreatedGroup}
          onPress={() => {
            navigation.navigate('PartyMake', { uid, partyID })
          }}
        ></CirclePlusFab>
      </View>
    </View>
  )
}

PartyGroupsScreen.navigationOptions = (props: NavigationStackScreenProps) => headerNavigationOptions(props)

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
    },
    entryButtonWrapper: {
      position: 'absolute',
      paddingHorizontal: 24,
      paddingLeft: width * 0.8,
      bottom: 24
    },
    entryText: {
      fontSize: 20,
      color: colors.foregrounds.onTintPrimary
    }
  })

export default PartyGroupsScreen
