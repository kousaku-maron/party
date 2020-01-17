import { Platform } from 'react-native'
import FlatDesignMembersCard from './FlatDesignMembersCard'
import MaterialDesignMembersCard from './MaterialDesignMembersCard'

const MembersCard = Platform.select({
  ios: FlatDesignMembersCard,
  android: MaterialDesignMembersCard,
  default: MaterialDesignMembersCard
})

export default MembersCard
