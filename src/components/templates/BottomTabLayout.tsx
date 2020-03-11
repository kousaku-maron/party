import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useStyles, MakeStyles } from '../../services/design'
import { useGoBackState } from '../../services/route'
import { ShadowBase } from '../atoms'
import { BottomTab } from '../organisms'

const BottomTabLayout: React.FC<{}> = ({ children }) => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const { enabled } = useGoBackState()

  return (
    <React.Fragment>
      {children}
      {!enabled && (
        <View style={[styles.tabContainer, { paddingBottom: inset.bottom }]}>
          <ShadowBase intensity={2}>
            <BottomTab fullWidth={true} />
          </ShadowBase>
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
    }
  })

export default BottomTabLayout
