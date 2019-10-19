import React from 'react'
import Modal from './Modal'
import { Picker, StyleSheet } from 'react-native'
import { useState } from 'react'

type Props = {
  isVisible: boolean
  uid: string
  title?: string
  negative?: string
  positive?: string
  onNegative: () => void
  onPositive: () => void
}

const GenderModal: React.FC<Props> = props => {
  const [genderVal, setGenderVal] = useState<string>()
  return (
    <Modal
      isVisible={props.isVisible}
      title={props.title}
      positive="選択"
      onPositive={props.onPositive}
      onNegative={props.onNegative}
    >
      <Picker
        style={[styles.picker]}
        itemStyle={styles.pickerItem}
        selectedValue={genderVal}
        onValueChange={itemValue => setGenderVal(itemValue)}
      >
        <Picker.Item label="女性" value={'female'} />
        <Picker.Item label="男性" value={'male'} />
      </Picker>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  picker: {
    width: 200,
    backgroundColor: '#FFF'
  },
  pickerItem: {
    color: 'blue'
  }
})

export default GenderModal
