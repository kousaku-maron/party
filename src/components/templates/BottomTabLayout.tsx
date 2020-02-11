import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../../services/design'
import { BottomTab } from '../organisms'

const BottomTabLayout: React.FC<{}> = ({ children }) => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)

  return (
    <React.Fragment>
      {children}
      <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
        <BottomTab fullWidth={true} />
      </View>
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
    }
  })

export default BottomTabLayout
