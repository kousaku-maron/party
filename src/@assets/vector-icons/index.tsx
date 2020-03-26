import React from 'react'
import { ChatIcon } from './chat'
import { ChatPlusIcon } from './chat-plus'
import { CheckIcon } from './check'
import { EditIcon } from './edit'
import { GlassIcon } from './glass'
import { GlassFillIcon } from './glass-fill'
import { HomeIcon } from './home'
import { PlusIcon } from './plus'
import { SendIcon } from './send'
import { SendFillIcon } from './send-fill'
import { TimeIcon } from './time'
import { UserIcon } from './user'
import { UserPlusIcon } from './user-plus'

type VectorIconsName = string

export type VectorIconsProps = {
  name: VectorIconsName
  size?: number
  color?: string
}

export const Icons = ({ name, size = 24, color = 'black' }: VectorIconsProps) => {
  switch (name) {
    case 'chat': {
      return <ChatIcon size={size} color={color} />
    }

    case 'chat-plus': {
      return <ChatPlusIcon size={size} color={color} />
    }

    case 'check': {
      return <CheckIcon size={size} color={color} />
    }

    case 'edit': {
      return <EditIcon size={size} color={color} />
    }

    case 'glass': {
      return <GlassIcon size={size} color={color} />
    }

    case 'glass-fill': {
      return <GlassFillIcon size={size} color={color} />
    }

    case 'home': {
      return <HomeIcon size={size} color={color} />
    }

    case 'plus': {
      return <PlusIcon size={size} color={color} />
    }

    case 'send': {
      return <SendIcon size={size} color={color} />
    }

    case 'send-fill': {
      return <SendFillIcon size={size} color={color} />
    }

    case 'time': {
      return <TimeIcon size={size} color={color} />
    }

    case 'user': {
      return <UserIcon size={size} color={color} />
    }

    case 'user-plus': {
      return <UserPlusIcon size={size} color={color} />
    }

    default:
      return null
  }
}
