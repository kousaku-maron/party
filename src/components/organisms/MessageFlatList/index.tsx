import React, { useRef, useCallback } from 'react'
import { FlatList, View, StyleSheet, StyleProp, ViewStyle, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { User } from '../../../entities'
import { useAppAuthState } from '../../../store/hooks'
import { useMessages } from '../../../services/chat'
import { useStyles, MakeStyles } from '../../../services/design'
import { ShadowBase } from '../../atoms'
import ChatBubble from './ChatBubble'

const HEADER_HEIGHT = 50 + 24 + 6 // height + paddingTop + paddingBottom
const TAB_HEIGHT = 70 // height
const ON_END_REACHED_THRESHOLD = 1

type Props = {
  roomID: string
  onPressAvatar?: (user: User) => void
  style?: StyleProp<ViewStyle>
  scrollEventThrottle?: number
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  // ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null
  // ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null
}

const MessageFlatListFC = ({ roomID, onPressAvatar, style, scrollEventThrottle, onScroll }: Props) => {
  const inset = useSafeArea()
  const { uid } = useAppAuthState()
  const { fetching, messages, onNext } = useMessages(roomID)
  const styles = useStyles(makeStyles)

  const onEndReachedCalled = useRef(false)

  const onEndReached = useCallback(async () => {
    if (fetching || onEndReachedCalled.current) return
    onEndReachedCalled.current = true
    await onNext()
    onEndReachedCalled.current = false
  }, [fetching, onNext])

  return (
    <FlatList
      style={style}
      showsVerticalScrollIndicator={false}
      inverted={true} // MEMO: 上下逆さまにしている。
      scrollEventThrottle={scrollEventThrottle}
      onScroll={onScroll}
      onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
      onEndReached={onEndReached}
      data={messages}
      renderItem={({ item }) => {
        const isMy = item.user.uid === uid

        return (
          <View key={item.id} style={isMy ? styles.myBubbleContainer : styles.bubbleContainer}>
            <ShadowBase>
              <ChatBubble message={item} isMy={isMy} onPressAvatar={onPressAvatar} />
            </ShadowBase>
          </View>
        )
      }}
      ListHeaderComponent={() => (
        <View
          style={{
            paddingBottom: messages.length > 3 ? inset.bottom + TAB_HEIGHT + 200 : inset.bottom + TAB_HEIGHT + 400
          }}
        />
      )}
      ListFooterComponent={() => <View style={{ paddingBottom: inset.top + HEADER_HEIGHT + 200 }} />}
    />
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    bubbleContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingLeft: 12,
      paddingBottom: 20
    },
    myBubbleContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: 12,
      paddingBottom: 20
    }
  })

// MEMO: Animated.createAnimatedComponent(MessageFlatList)を有効化するために、class componentにしている。
class MessageFlatList extends React.Component<Props, {}> {
  render() {
    return <MessageFlatListFC {...this.props} />
  }
}

export default MessageFlatList
