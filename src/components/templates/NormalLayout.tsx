import React from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'
import { useUIState } from '../../store/hooks'
import { useStyles, MakeStyles } from '../../services/design'
import { Indicator } from '../../@assets/lottie'

type Props = {
  tintColor?: string
  headerTitle?: string
  renderHeaderTitle?: () => React.ReactElement
  renderHeaderRight?: () => React.ReactElement
  fetching?: boolean
}

const NormalLayout: React.FC<Props> = ({ children, fetching = false }) => {
  const styles = useStyles(makeStyles)
  const { theme } = useUIState()

  return (
    <React.Fragment>
      {children}

      {fetching && (
        <View style={styles.indicatorContainer}>
          <Indicator theme={theme} size={100} />
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

export default NormalLayout
