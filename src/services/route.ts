import { useState, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import { StackActions } from '@react-navigation/native'

export const useGoBackState = () => {
  const navigation = useNavigation()
  const [enabled, setEnabled] = useState<boolean>(false)

  const goBack = useCallback(() => {
    if (!navigation.canGoBack()) return
    navigation.goBack()
  }, [navigation])

  useEffect(() => {
    try {
      if (navigation.dangerouslyGetState().index === 0) {
        setEnabled(false)
        return
      }

      setEnabled(true)
    } catch (e) {
      console.warn(e)
      setEnabled(false)
    }
  }, [navigation])

  return { enabled, goBack }
}

// MEMO: 今後負債になると思われるので、react-navigationの動向をみてリファクタリングする。
export const useStackNavigation = () => {
  const navigation = useNavigation()

  const stackNavigation = {
    ...navigation,
    push: (name: string, params?: object) => {
      navigation.dispatch(StackActions.push(name, params))
    },
    pop: (count: number) => {
      navigation.dispatch(StackActions.pop(count))
    },
    popToTop: () => {
      navigation.dispatch(StackActions.popToTop())
    }
  }

  return stackNavigation
}
