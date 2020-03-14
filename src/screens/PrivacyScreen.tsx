import React from 'react'
import { WebView } from 'react-native-webview'
import { View, StyleSheet } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { Header } from '../components/organisms'
import { useStyles, MakeStyles } from '../services/design'

const PrivacyScreen = () => {
  const styles = useStyles(makeStyles)
  const inset = useSafeArea()

  return (
    <React.Fragment>
      <View style={(styles.headerBackground, { paddingTop: inset.top })}>
        <View style={styles.headerTopSpacer} />
        <View style={styles.headerContainer}>
          <Header fullWidth={true} title="プライバシー・ポリシー" />
        </View>
      </View>
      <WebView scrollEnabled={true} source={{ uri: 'https://insta-693eb.web.app/webview-privacy' }} />
    </React.Fragment>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    headerBackground: {
      backgroundColor: colors.backgrounds.tertiary
    },
    headerContainer: {
      width: '100%',
      paddingHorizontal: 24
    }
  })

export default PrivacyScreen
