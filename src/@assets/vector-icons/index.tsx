import React from 'react'
import { HomeIcon } from './home'
import { ChatIcon } from './chat'
import { UserIcon } from './user'

type VectorIconsName = 'home' | 'chat' | 'user'

export type VectorIconsProps = {
  name: VectorIconsName
  size?: number
  color?: string
}

export const Icons = ({ name, size = 24, color = 'black' }: VectorIconsProps) => {
  switch (name) {
    case 'home': {
      return <HomeIcon size={size} color={color} />
    }

    case 'chat': {
      return <ChatIcon size={size} color={color} />
    }

    case 'user': {
      return <UserIcon size={size} color={color} />
    }

    default:
      return null
  }
}
