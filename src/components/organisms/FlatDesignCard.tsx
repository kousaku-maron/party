import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../../services/design'
import { formatedDateFull } from '../../services/formatedDate'
import { RoundedButton } from '../atoms'

type Props = {
  uri: ImageSourcePropType
  name: string
  date: Date
  width: number
  onPressDetail: () => void
  onPressEntry: () => void
}

const FlatDesignCard: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const date = formatedDateFull(props.date)

  return (
    <View>
      <View style={styles.imageBorderRadius}>
        <Image style={[styles.image, { width: props.width }]} source={props.uri} />
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <RoundedButton
              disabled={true} // MEMO: DEMO時に押されると厄介なので、押させない。
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressDetail}
            >
              <Text style={styles.buttonText}>詳細</Text>
            </RoundedButton>
          </View>
          <View style={styles.buttonWrapper}>
            <RoundedButton
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressEntry}
            >
              <Text style={styles.buttonText}>参加</Text>
            </RoundedButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    imageBorderRadius: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
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
    date: {
      color: colors.foregrounds.onTintPrimary,
      padding: 6
    },
    description: {
      backgroundColor: colors.tints.primary.main,
      height: 80,
      justifyContent: 'space-between',
      padding: 6,
      flexDirection: 'row',
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      overflow: 'hidden'
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    buttonWrapper: {
      padding: 3
    },
    buttonText: {
      fontSize: 18,
      color: colors.tints.primary.main
    }
  })

export default FlatDesignCard
