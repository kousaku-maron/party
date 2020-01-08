import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../../services/design'
import { AngularedButton } from '../atoms'

type Props = {
  thumbnailURL: ImageSourcePropType
  name: string
  width: number
  partyID: string
  isAppliedParty: boolean
  onPressDetail: () => void
  onPressEntry: () => void
}

const MaterialDesignGroupCard: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  return (
    <View>
      <View style={styles.imageBorderRadius}>
        <Image style={[styles.image, { width: props.width }]} source={props.thumbnailURL} />
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <AngularedButton
              disabled={false}
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              //TODO:memberの詳細を表示するようにする
              onPress={props.onPressDetail}
            >
              <Text style={styles.buttonText}>詳細</Text>
            </AngularedButton>
          </View>
          <View style={styles.buttonWrapper}>
            <AngularedButton
              disabled={props.isAppliedParty}
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressEntry}
            >
              <Text style={styles.buttonText}>申請</Text>
            </AngularedButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    imageBorderRadius: {
      overflow: 'hidden'
    },
    image: {
      height: 200
    },
    name: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 25,
      padding: 6,
      fontWeight: 'bold'
    },
    description: {
      backgroundColor: colors.tints.primary.main,
      height: 80,
      justifyContent: 'space-between',
      padding: 6,
      flexDirection: 'row',
      overflow: 'hidden'
    },
    buttonContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row'
    },
    buttonWrapper: {
      padding: 3
    },
    buttonText: {
      fontSize: 18,
      color: colors.tints.primary.main
    }
  })

export default MaterialDesignGroupCard
