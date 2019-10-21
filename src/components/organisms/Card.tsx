import { Platform } from 'react-native'
import FlatDesignCard from './FlatDesignCard'
import MaterialDesignCard from './MaterialDesignCard'

const Card = Platform.select({
  ios: FlatDesignCard,
  android: MaterialDesignCard,
  default: MaterialDesignCard
})

export default Card
