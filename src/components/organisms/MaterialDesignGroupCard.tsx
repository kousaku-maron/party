import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../../services/design'
import { AngularedButton } from '../atoms'

type Props = {
  thumbnailURL: string
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
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {props.thumbnailURL && (
          <Image style={[styles.image, { width: props.width }]} source={{ uri: props.thumbnailURL }} />
        )}
        {!props.thumbnailURL && (
          <Image
            style={[styles.image, { width: props.width }]}
            source={require('../../../assets/images/no_user.png')}
          />
        )}
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
    container: {
      alignItems: 'flex-end',
      width: '100%',
      height: 285
    },
    imageWrapper: {
      width: '100%',
      height: '80%',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    name: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 25,
      padding: 6,
      fontWeight: 'bold'
    },
    description: {
      backgroundColor: colors.tints.primary.main,
      width: '100%',
      height: '20%',
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
