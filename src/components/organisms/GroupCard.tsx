import { Platform } from 'react-native'
import FlatDesignGroupCard from './FlatDesignGroupCard'
import MaterialDesignGroupCard from './MaterialDesignGroupCard'

const GroupCard = Platform.select({
  ios: FlatDesignGroupCard,
  android: MaterialDesignGroupCard,
  default: MaterialDesignGroupCard
})

export default GroupCard
