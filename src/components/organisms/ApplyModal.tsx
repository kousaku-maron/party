import React from 'react'
import FlatDesignModal from './FlatDesignModal'
import MaterialDesignModal from './MaterialDesignModal'
import { isIPhoneXAbove, isIPhoneX } from '../../services/design/ios'

type Props = {
  title?: string
  uid: string
  partyId: string
  isVisible: boolean
  desc: string
  negative: string
  positive: string
  onApply: (uid: string) => void
  onClose: () => void
}

const ApplyModal: React.FC<Props> = props => {
  const onPositive = () => {
    props.onApply(props.uid)
  }
  if (isIPhoneXAbove || isIPhoneX) {
    return (
      <FlatDesignModal
        isVisible={props.isVisible}
        title={props.title}
        desc={props.desc}
        negative={props.negative}
        positive={props.positive}
        onNegative={props.onClose}
        onPositive={onPositive}
      ></FlatDesignModal>
    )
  } else {
    return (
      <MaterialDesignModal
        isVisible={props.isVisible}
        title={props.title}
        desc={props.desc}
        negative={props.negative}
        positive={props.positive}
        onNegative={props.onClose}
        onPositive={onPositive}
      ></MaterialDesignModal>
    )
  }
}
export default ApplyModal
