import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { colors } from '../../themes'
import { formatedDate } from '../../services/formatedDate'
import { RoundedButton } from '../atoms'
import { NavigationStackProp } from 'react-navigation-stack'

type Props = {
  uri: ImageSourcePropType
  name: string
  date: Date
  width: number
  navigation: NavigationStackProp
  onPressDetail: () => void
  onPressApply: () => void
}

const FlatDesignCard: React.FC<Props> = props => {
  const date = formatedDate(props.date)
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
              color={'#FFFFFF'}
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
              color={'#FFFFFF'}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressApply}
            >
              <Text style={styles.buttonText}>参加</Text>
            </RoundedButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    color: 'white',
    fontSize: 25,
    padding: 6,
    fontWeight: 'bold'
  },
  date: {
    color: 'white',
    padding: 6
  },
  description: {
    backgroundColor: colors.primary.main,
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
    color: colors.primary.dark
  }
})

export default FlatDesignCard
