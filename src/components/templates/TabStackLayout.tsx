import React, { useEffect, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../../services/design'
import { BackButton } from '../atoms'

// TODO: 命名を考える。
const TabStackLayout: React.FC<{}> = ({ children }) => {
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
      {enabledGoBack && (
        <View style={[styles.backIconContainer, { paddingTop: inset.top }]}>
          <BackButton onPress={goBack} />
        </View>
      )}
    </React.Fragment>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    backIconContainer: {
      position: 'absolute',
      top: 0,
      left: 12
    }
  })

export default TabStackLayout
