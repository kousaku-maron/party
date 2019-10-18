import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { colors } from '../../themes'

type Props = {
  uri: ImageSourcePropType
  name: string
  date: string
  width: number
}

const MaterialDesignCard: React.FC<Props> = props => {
  return (
    <View>
      <View style={styles.imageBorderRadius}>
        <Image style={[styles.image, { width: props.width }]} source={props.uri} />
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.date}>{props.date}</Text>
        </View>
        {props.children}
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
    padding: 6
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

export default MaterialDesignCard
