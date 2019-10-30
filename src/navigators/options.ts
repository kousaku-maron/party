import { NavigationStackScreenProps } from 'react-navigation-stack'
import { getTheme } from '../themes'

const palette = getTheme()

type CustomHeaderNavigaitonOptions = {
  title?: string
}

export const headerNavigationOptions = (props: NavigationStackScreenProps & CustomHeaderNavigaitonOptions) => {
  const colors = props.theme === 'dark' ? palette.dark : palette.light
  return {
    headerTitle: props.title ? props.title : 'Nomoca',
    headerBackTitle: null,
    headerTintColor: colors.foregrounds.primary,
    headerStyle: {
      backgroundColor: colors.backgrounds.secondary
    }
  }
}