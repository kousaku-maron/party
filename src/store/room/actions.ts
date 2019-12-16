import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

export interface Fetch {
  onSuccess?: () => void
  onFailure?: () => void
}

export const roomActions = {
  entryDemoRoom: actionCreator<Fetch & { roomID: string }>('ENTRY_DEMO_ROOM')
}

export const useRoomActions = () => {
  const dispatch = useDispatch()

  const entryDemoRoom = useCallback(
    roomID => {
      dispatch(roomActions.entryDemoRoom({ roomID }))
    },
    [dispatch]
  )

  return { entryDemoRoom }
}
