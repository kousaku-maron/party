import React, { useCallback } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { useColors, MakeStyles, useStyles } from '../../services/design'
import { useGoBackState } from '../../services/route'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  title?: string
  tintColor?: string
  width?: number
  height?: number
  fullWidth?: boolean
  renderTitle?: () => React.ReactElement
  renderRight?: () => React.ReactElement
}

const headerHeight = 50

const Header: React.FC<Props> = ({
  title,
  tintColor,
  width = 350,
  height = headerHeight,
  fullWidth = false,
  renderTitle,
  renderRight
}) => {
  const styles = useStyles(makeStyles)
  const colors = useColors()
  const { enabled, goBack } = useGoBackState()

  const onRenderTitle = useCallback(() => {
    if (renderTitle) {
      const titleComponent: React.ReactElement = <View style={styles.centerWrapper}>{renderTitle()}</View>
      return titleComponent
    }

    if (title) {
      const titleComponent: React.ReactElement = (
        <View style={styles.centerWrapper}>
          <Text style={[styles.headerTitleText, { color: tintColor ?? colors.foregrounds.primary }]}>{title}</Text>
        </View>
      )

      return titleComponent
    }

    const titleComponent: React.ReactElement = <View style={styles.centerWrapper} />
    return titleComponent
  }, [colors.foregrounds.primary, renderTitle, styles.centerWrapper, styles.headerTitleText, tintColor, title])

  return (
    <View
      style={[
        styles.container,
        {
          width: fullWidth ? '100%' : width,
          height
        }
      ]}
    >
      {enabled && (
        <View style={styles.leftWrapper}>
          <TouchableOpacity onPress={goBack}>
            <AntDesign name="arrowleft" size={24} color={tintColor ?? colors.foregrounds.primary} />
          </TouchableOpacity>
        </View>
      )}

      {!enabled && <View style={styles.leftWrapper} />}

      {onRenderTitle()}

      {renderRight && <View style={styles.rightWrapper}>{renderRight()}</View>}
      {!renderRight && <View style={styles.rightWrapper} />}
    </View>
  )
}

const makeStyles: MakeStyles = () =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    leftWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 50
    },
    rightWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: 50
    },
    centerWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    headerTitleText: {
      fontSize: 18,
      fontWeight: 'bold'
    }
  })

export default Header
