import { Platform } from 'react-native'
import FlatDesignCard from '../atoms/FlatDesignCard'
import MaterialDesignCard from '../atoms/MaterialDesignCard'
const Card = Platform.select({
  ios: FlatDesignCard,
  android: MaterialDesignCard,
  default: MaterialDesignCard
})

export default Card
