import React, { useCallback, useState, useEffect } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../../services/design'
import { BottomTab } from '../organisms'
import { BackButton } from '../atoms'

const BottomTabLayout: React.FC<{}> = ({ children }) => {
  const navigation = useNavigation()
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)

  const goBack = useCallback(() => {
    navigation.goBack()
  }, [navigation])

  const [enabledGoBack, setEnabledGoBack] = useState<boolean>(false)
  useEffect(() => {
    const parentNav = navigation.dangerouslyGetParent()
    if (parentNav.state.routes.length > 1) {
      setEnabledGoBack(true)
      return
    }

    setEnabledGoBack(false)
  }, [navigation])

  return (
    <React.Fragment>
      {children}
      {!enabledGoBack && (
        <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
          <BottomTab fullWidth={true} />
        </View>
      )}

      {enabledGoBack && (
        <View style={[styles.backIconContainer, { paddingTop: inset.top }]}>
          <BackButton onPress={goBack} />
        </View>
      )}
    </React.Fragment>
  )
}

const fullWidth = Dimensions.get('window').width

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    tabContainer: {
      position: 'absolute',
      bottom: 0,
      width: fullWidth,
      paddingHorizontal: 12
    },
    backIconContainer: {
      position: 'absolute',
      top: 0,
      left: 12
    }
  })

export default BottomTabLayout
