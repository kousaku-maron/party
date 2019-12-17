import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import actionCreateFactory from 'typescript-fsa'

const actionCreator = actionCreateFactory()

export interface Fetch {
  onSuccess?: () => void
  onFailure?: () => void
}

export const roomActions = {
  entryDemoRoomRequest: actionCreator<Fetch & { roomID: string }>('ENTRY_DEMO_ROOM_REQUEST'),
  entryDemoRoomSuccess: actionCreator<Pick<Fetch, 'onSuccess'>>('ENTRY_DEMO_ROOM_SUCCESS'),
  entryDemoRoomFailure: actionCreator<Pick<Fetch, 'onFailure'>>('ENTRY_DEMO_ROOM_FAILURE')
}

export const useRoomActions = () => {
  const dispatch = useDispatch()

  const entryDemoRoom = useCallback(
    ({ roomID, onSuccess, onFailure }: Fetch & { roomID: string }) => {
      dispatch(roomActions.entryDemoRoomRequest({ roomID, onSuccess, onFailure }))
    },
    [dispatch]
  )

  return { entryDemoRoom }
}
