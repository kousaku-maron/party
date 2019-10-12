import { useState, useCallback } from 'react'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const onOpen = useCallback(() => {
    setIsVisible(true)
  }, [])

  const onClose = useCallback(() => {
    setIsVisible(false)
  }, [])

  return { isVisible, onOpen, onClose }
}
