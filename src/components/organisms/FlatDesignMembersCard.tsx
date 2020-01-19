import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  name: string
  thumbnailURL: string
  width: number
}

const FlatDesignMembersCard: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  console.log(props.thumbnailURL)

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {props.thumbnailURL && <Image style={[styles.image]} source={{ uri: props.thumbnailURL }} />}
        {!props.thumbnailURL && <Image style={[styles.image]} source={require('../../../assets/images/no_user.png')} />}
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
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
      borderTopRightRadius: 16,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
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
      fontWeight: 'bold',
      textAlign: 'center'
    },
    description: {
      width: '100%',
      height: '20%',
      backgroundColor: colors.tints.primary.main,
      padding: 6,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
      overflow: 'hidden'
    }
  })

export default FlatDesignMembersCard
