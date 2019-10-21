import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { colors } from '../../themes'
import { formatedDateFull } from '../../services/formatedDate'
import { AngularedButton } from '../atoms'

type Props = {
  uri: ImageSourcePropType
  name: string
  date: Date
  width: number
  onPressDetail: () => void
  onPressApply: () => void
}

const MaterialDesignCard: React.FC<Props> = props => {
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
            <AngularedButton
              color={'#FFFFFF'}
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
              color={'#FFFFFF'}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressApply}
            >
              <Text style={styles.buttonText}>参加</Text>
            </AngularedButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageBorderRadius: {
    overflow: 'hidden'
  },
  image: {
    height: 200
  },
  name: {
    color: 'white',
    fontSize: 25,
    padding: 6,
    fontWeight: 'bold'
  },
  date: {
    color: 'white',
    paddingRight: 6,
    paddingLeft: 6,
    paddingBottom: 6
  },
  description: {
    backgroundColor: colors.primary.main,
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
    color: colors.primary.dark
  }
})

export default MaterialDesignCard
