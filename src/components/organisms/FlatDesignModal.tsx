import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'

type Props = {
  isVisible: boolean
  title: string
  desc?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: () => void
}

const FlatDesignModal: React.FC<Props> = props => {
  return (
    <View>
      <Modal isVisible={props.isVisible} animationIn="bounceIn" animationOut="fadeOut">
        <View style={styles.inner}>
          <View style={styles.contentsArea}>
            {/* Title and Description */}
            {props.title && props.desc && (
              <View style={[styles.contentsWrapper, styles.centerAlign]}>
                <View style={styles.titleWrapper}>
                  <Text style={styles.titleText}>{props.title}</Text>
                </View>

                <Text style={styles.descText}>{props.desc}</Text>
              </View>
            )}

            {props.title && !props.desc && (
              <View style={styles.contentsWrapper}>
                <Text style={styles.titleText}>{props.title}</Text>
              </View>
            )}

            {/* Children */}
            {props.children}
          </View>

          <View style={styles.actionArea}>
            <TouchableOpacity style={[styles.button, styles.borderRight]} onPress={props.onNegative}>
              <Text style={styles.buttonText}>{props.negative ? props.negative : 'キャンセル'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={props.onPositive}>
              <Text style={styles.buttonText}>{props.positive ? props.positive : 'OK'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  inner: {
    display: 'flex',
    backgroundColor: '#ededed',
    borderRadius: 16
  },
  contentsArea: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16
  },
  actionArea: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  contentsWrapper: {
    paddingBottom: 32
  },
  titleWrapper: {
    paddingBottom: 16
  },
  centerAlign: {
    display: 'flex',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderTopWidth: hairlineWidth
  },
  borderRight: {
    borderColor: 'gray',
    borderRightWidth: hairlineWidth
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  descText: {
    fontSize: 16
  },
  buttonText: {
    fontSize: 16,
    color: 'rgb(0, 122, 255)'
  }
})

export default FlatDesignModal
