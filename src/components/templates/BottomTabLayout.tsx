import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useUIState } from '../../store/hooks'
import { useStyles, MakeStyles } from '../../services/design'
import { useGoBackState } from '../../services/route'
import { Indicator } from '../../@assets/lottie'
import { ShadowBase } from '../atoms'
import { BottomTab } from '../organisms'

type Props = {
  tintColor?: string
  headerTitle?: string
  renderHeaderTitle?: () => React.ReactElement
  renderHeaderRight?: () => React.ReactElement
  fetching?: boolean
}

const BottomTabLayout: React.FC<Props> = ({ children, fetching = false }) => {
  const inset = useSafeArea()
  const styles = useStyles(makeStyles)
  const { theme } = useUIState()
  const { enabled } = useGoBackState()

  return (
    <React.Fragment>
      {children}

      {fetching && (
        <View style={styles.indicatorContainer}>
          <Indicator theme={theme} size={100} />
        </View>
      )}

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
      paddingHorizontal: 24
    },
    indicatorContainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }
  })

export default BottomTabLayout
