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
  onPress?: () => void
}

const PartyPrimaryCard: React.FC<Props> = ({ party, users, onPress, width = 320, height = 480, disabled = false }) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const count = useMemo(() => {
    return party.entryUIDs ? party.entryUIDs.length : 0
  }, [party.entryUIDs])

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.container, { width, height }]}>
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
                    size={38}
                    uri={user.thumbnailURL}
                    borderColor={colors.foregrounds.onTintPrimary}
                    borderWidth={1}
                  />
                )
              }
              return (
                <View key={user.id} style={styles.avatarWrapper}>
                  <Thumbnail
                    size={38}
                    uri={user.thumbnailURL}
                    borderColor={colors.foregrounds.onTintPrimary}
                    borderWidth={1}
                  />
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
            <AntDesign name="user" size={18} /> {count}
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
      left: 12,
      bottom: 12
    },
    countWrapper: {
      position: 'absolute',
      right: 12,
      top: 12
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
      minWidth: 60,
      borderRadius: 16,
      padding: 6
    },
    avatarsTag: {
      borderRadius: 24,
      padding: 6
    },
    others: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 38,
      height: 38,
      borderRadius: 19,
      borderColor: colors.foregrounds.onTintPrimary, // これどうしよう...
      borderWidth: 1
    },
    titleText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 24
    },
    areaText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 16
    },
    countText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 16
    },
    otherText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 12
    },
    imageWrapper: {
      width: '100%',
      height: '70%',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      overflow: 'hidden'
    }
  })

export default PartyPrimaryCard
