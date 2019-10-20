import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { User } from '../entities'
import { PartyEntryScreenState } from '../containers/PartyEntryScreen'
import { colors } from '../themes'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useModal } from '../services/modal'
import * as userRepository from '../repositories/user'
import { LoadingPage, SearchUserPage } from '../components/pages'
import { Thumbnail, RoundedButton } from '../components/atoms'
import _ from 'lodash'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & PartyEntryScreenState

const MEMBERS_COUNT = 2

const PartyEntryScreen = (props: Props) => {
  const { auth } = props
  const { uid } = auth

  const { isVisible, onClose, onOpen } = useModal()
  const [organizer, setOrganizer] = useState<User | null>()
  const [members, setMembers] = useState<(User | null)[]>([])

  const [focusMemberIndex, setFocusMemberIndex] = useState<number>(0)

  const onSearch = useCallback(
    (index: number) => {
      onOpen()
      setFocusMemberIndex(index)
    },
    [onOpen]
  )

  const onSelectUser = useCallback(
    (user: User) => {
      setMembers(prev => {
        const newMembers = [...prev]
        newMembers[focusMemberIndex] = user
        return newMembers
      })
      onClose()
    },
    [focusMemberIndex, onClose]
  )

  const enabledEntry = useMemo(() => {
    const emptyMembers = members.findIndex(member => _.isEmpty(member))
    if (emptyMembers === -1) {
      return true
    }
    return false
  }, [members])

  const onEntry = useCallback(() => {
    if (!enabledEntry) return
    console.info(members) // TODO: 参加申請の関数を発火させる。
  }, [enabledEntry, members])

  useEffect(() => {
    const fetchMyUser = async () => {
      const user = await userRepository.getUser(uid)
      setOrganizer(user)
      setMembers([user, ...Array(MEMBERS_COUNT - 1).fill(null)])
    }
    fetchMyUser()
  }, [uid])

  if (!organizer) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      {/* MEMO: 今後、ScrollViewで囲う可能性があるため、Viewで括っている */}
      <View>
        <View style={styles.inner}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleText}>参加ユーザー</Text>
          </View>
          <View>
            {members.map((member, index) => {
              if (!member) {
                return (
                  <View key={index} style={styles.memberWrapper}>
                    <Thumbnail size={100} onPress={() => onSearch(index)} />
                  </View>
                )
              }

              return (
                <View key={member.uid} style={styles.memberWrapper}>
                  <View style={styles.thumbnailWrapper}>
                    {index === 0 ? (
                      <Thumbnail size={100} uri={member.thumbnailURL} />
                    ) : (
                      <Thumbnail size={100} onPress={() => onSearch(index)} />
                    )}
                  </View>
                  <Text>{member.name}</Text>
                  <Text style={styles.idText}>@{member.userID}</Text>
                </View>
              )
            })}
          </View>
        </View>
      </View>

      <View style={styles.entryButtonWrapper}>
        <RoundedButton disabled={!enabledEntry} fullWidth={true} height={48} onPress={onEntry}>
          <Text style={styles.entryText}>参加する</Text>
        </RoundedButton>
      </View>

      <SearchUserPage isVisible={isVisible} onClose={onClose} onSelectUser={onSelectUser} />
    </View>
  )
}

PartyEntryScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null
})

const width = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: colors.inherit
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 24
  },
  titleWrapper: {
    paddingBottom: 24
  },
  memberWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 24
  },
  thumbnailWrapper: {
    paddingBottom: 6
  },
  entryButtonWrapper: {
    position: 'absolute',
    width,
    paddingHorizontal: 24,
    bottom: 24
  },
  titleText: {
    fontSize: 24
  },
  idText: {
    color: 'gray'
  },
  entryText: {
    fontSize: 20,
    color: 'white'
  }
})

export default PartyEntryScreen
