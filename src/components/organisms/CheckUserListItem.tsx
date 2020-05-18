import React from 'react'
import { User } from '../../entities'
import { useColors } from '../../services/design'
import { Fab } from '../atoms'
import { Icons } from '../../@assets/vector-icons'
import UserCard from './UserCard'

type Props = {
  user: User
  checked: boolean
  onPress: (user: User) => void
}

const CheckUserListItem = ({ user, checked, onPress }: Props) => {
  const colors = useColors()

  return (
    <UserCard
      user={user}
      onPress={onPress}
      fullWidth={true}
      renderRight={() => {
        if (checked) {
          return (
            <Fab color={colors.backgrounds.secondary}>
              <Icons color={colors.tints.primary.main} name="check" size={24} />
            </Fab>
          )
        }
      }}
    />
  )
}

export default CheckUserListItem
