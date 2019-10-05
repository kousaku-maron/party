import { createStackNavigator } from 'react-navigation-stack'
import { PostFinishScreen } from '../screens'

const PostFinishNavigator = createStackNavigator(
  {
    PostScreen: PostFinishScreen
  },
  {
    initialRouteName: 'PostScreen'
  }
)

export default PostFinishNavigator
