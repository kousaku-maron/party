import React from 'react'
import { View /* , Text */ } from 'react-native'
import { useColors } from '../../../services/design'
import { Composer, ComposerProps } from 'react-native-gifted-chat'
// import { RoundedButton } from '../../atoms'

export const CustomComposer = (
  props: Readonly<ComposerProps> &
    Readonly<{
      children?: React.ReactNode
    }>
) => {
  const colors = useColors()

  return (
    <View style={{ flex: 1, flexDirection: 'row', paddingRight: 3 }}>
      <Composer
        {...props}
        textInputStyle={{
          borderRadius: 12,
          paddingTop: 8,
          paddingLeft: 12,
          backgroundColor: colors.backgrounds.tertiary,
          color: colors.foregrounds.primary
        }}
        placeholderTextColor={colors.foregrounds.placeholder}
      />
      {/* <RoundedButton>
        <Text>動画</Text>
      </RoundedButton>
      <RoundedButton>
        <Text>画像</Text>
      </RoundedButton> */}
    </View>
  )
}
