import React, { useState } from 'react'
import Modal from './Modal'
import { Picker, StyleSheet, View } from 'react-native'
import { useStyles, MakeStyles } from '../../services/design'

type Props = {
  isVisible: boolean
  uid: string
  title?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: (uid: string, gender: string) => void
}

const GenderModal: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)

  const [genderVal, setGenderVal] = useState<string>()
  return (
    <Modal
      isVisible={props.isVisible}
      title={props.title}
      positive="選択"
      onPositive={() => {
        props.onPositive(props.uid, genderVal)
      }}
      onNegative={props.onNegative}
    >
      <View style={styles.pickerWrapper}>
        <Picker
          style={[styles.picker]}
          itemStyle={styles.pickerItem}
          selectedValue={genderVal}
          onValueChange={itemValue => {
            setGenderVal(itemValue)
          }}
        >
          <Picker.Item label="女性" value={'female'} />
          <Picker.Item label="男性" value={'male'} />
        </Picker>
      </View>
    </Modal>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    pickerWrapper: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    picker: {
      width: '100%'
    },
    pickerItem: {
      color: colors.system.blue
    }
  })

export default GenderModal
