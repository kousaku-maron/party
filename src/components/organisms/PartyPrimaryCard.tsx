import React, { useMemo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { BlurView } from 'expo-blur'
import { AntDesign } from '@expo/vector-icons'
import { useStyles, MakeStyles, useColors } from '../../services/design'
import { Party, User } from '../../entities'
import { Thumbnail } from '../atoms'

type Props = {
  party: Party
  users?: User[]
  height?: number
  width?: number
  disabled?: boolean
  onPress?: (party: Party) => void
}

const PartyPrimaryCard: React.FC<Props> = ({ party, users, onPress, width = 260, height = 380, disabled = false }) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const count = useMemo(() => {
    return party.entryUIDs ? party.entryUIDs.length : 0
  }, [party.entryUIDs])

  return (
    <TouchableOpacity disabled={disabled} onPress={() => onPress(party)} style={[styles.container, { width, height }]}>
      <Image source={{ uri: party.thumbnailURL }} style={styles.image} />
      <View style={styles.contentsWrapper}>
        <View style={styles.mainInfoTagWrapper}>
          <BlurView intensity={10} tint="light" style={styles.mainInfoTag}>
            <View style={styles.titleTextWrapper}>
              <Text style={styles.titleText}>{party.name}</Text>
            </View>
            <View style={styles.areaTextWrapper}>
              <Text style={styles.areaText}>東京エリア</Text>
            </View>
          </BlurView>
        </View>

        <BlurView intensity={50} tint="light" style={styles.avatarsTag}>
          <View style={styles.avatarsWrapper}>
            {users.map((user, i) => {
              if (i === 0) {
                return (
                  <Thumbnail
                    key={user.id}
                    size={32}
                    uri={user.thumbnailURL}
                    borderColor={colors.system.white}
                    borderWidth={1}
                  />
                )
              }
              return (
                <View key={user.id} style={styles.avatarWrapper}>
                  <Thumbnail size={32} uri={user.thumbnailURL} borderColor={colors.system.white} borderWidth={1} />
                </View>
              )
            })}

            <View style={styles.othersWrapper}>
              <View style={styles.others}>
                <Text style={styles.otherText}>+ {count - users.length}</Text>
              </View>
            </View>
          </View>
        </BlurView>
      </View>
      <View style={styles.countWrapper}>
        <BlurView intensity={50} tint="light" style={styles.countTag}>
          <Text style={styles.countText}>
            <AntDesign name="user" size={16} /> {count}
          </Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      position: 'relative',
      borderRadius: 20
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 20
    },
    contentsWrapper: {
      position: 'absolute',
      left: 10,
      bottom: 10
    },
    countWrapper: {
      position: 'absolute',
      right: 10,
      top: 10
    },
    titleTextWrapper: {
      paddingBottom: 6
    },
    areaTextWrapper: {},
    avatarsWrapper: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row'
    },
    avatarWrapper: {
      marginLeft: -8
    },
    othersWrapper: {
      paddingLeft: 6
    },
    mainInfoTagWrapper: {
      paddingBottom: 12
    },
    mainInfoTag: {
      borderRadius: 12,
      padding: 6
    },
    countTag: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      minWidth: 60, // 幅は70が理想値
      borderRadius: 15
    },
    avatarsTag: {
      borderRadius: 23,
      padding: 6
    },
    others: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 34,
      height: 34,
      borderRadius: 17,
      borderColor: colors.system.white,
      borderWidth: 1
    },
    titleText: {
      color: colors.system.white,
      fontSize: 16
    },
    areaText: {
      color: colors.system.white,
      fontSize: 12
    },
    countText: {
      color: colors.system.white,
      fontSize: 16
    },
    otherText: {
      color: colors.system.white,
      fontSize: 12
    }
  })

export default PartyPrimaryCard
