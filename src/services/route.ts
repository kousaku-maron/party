import { useState, useCallback, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'

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
