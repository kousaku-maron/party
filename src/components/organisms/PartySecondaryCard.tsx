import React, { useMemo } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { BlurView } from 'expo-blur'
import { AntDesign } from '@expo/vector-icons'
import { useStyles, MakeStyles } from '../../services/design'
import { Party } from '../../entities'

type Props = {
  party: Party
  height?: number
  width?: number
  disabled?: boolean
  onPress?: (party: Party) => void
}

const PartySecondaryCard: React.FC<Props> = ({ party, onPress, width = 160, height = 240, disabled = false }) => {
  const styles = useStyles(makeStyles)

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
    mainInfoTagWrapper: {},
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
    titleText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 20
    },
    areaText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 16
    },
    countText: {
      color: colors.foregrounds.onTintPrimary, // これどうしよう...
      fontSize: 16
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

export default PartySecondaryCard
