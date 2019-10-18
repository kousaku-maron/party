import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { colors } from '../themes'
import { useUser } from '../services/user'
import { useCertificate } from '../services/secure'
import { useModal } from '../services/modal'
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, Thumbnail } from '../components/atoms'
import { UploadCertificateModal } from '../components/organisms'
import { LoadingPage } from '../components/pages'

type OwnProps = {
  navigation: NavigationStackProp
}

type Props = OwnProps & UserScreenState & UserScreenActions

const UserScreen = (props: Props) => {
  const { navigation, auth, signOut } = props
  const { uid } = auth

  const user = useUser(uid)
  const modalTools = useModal()
  const { onChangeUpdateCertificateURL, currentCertificateURL, uploadCertificateURL, upload } = useCertificate(uid)

  const _pickCertificateImage = useCallback(async () => {
    const { cancelled, uri } = await onChangeUpdateCertificateURL()
    if (!cancelled && uri) {
      modalTools.onOpen()
    }
  }, [modalTools, onChangeUpdateCertificateURL])

  const onUpload = useCallback(() => {
    upload()
    modalTools.onClose()
  }, [modalTools, upload])

  const _signOut = useCallback(async () => {
    signOut({
      onSuccess: () => navigation.navigate('Welcome')
    })
  }, [navigation, signOut])

  const goToEdit = useCallback(() => {
    navigation.navigate('UserEdit')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.thumbnailWrapper}>
          <Thumbnail uri={user.thumbnailURL} size={150} />
        </View>

        <View style={styles.nameWrapper}>
          <Text style={styles.nameText}>{user.name}</Text>
        </View>

        <View style={styles.idWrapper}>
          <Text style={styles.idText}>@{user.userID}</Text>
        </View>

        {user.isAccepted && (
          <View style={styles.isAcceptedWrapper}>
            <Text style={styles.acceptCaptionText}>本人確認済み</Text>
          </View>
        )}

        {!user.isAccepted && (
          <View style={styles.isNotacceptedWrapper}>
            <RoundedButton color={colors.primary.main} fullWidth={true} onPress={_pickCertificateImage}>
              <Text style={styles.acceptText}>身分証をアップロードする</Text>
            </RoundedButton>
          </View>
        )}

        {!user.isAccepted && (
          <View style={styles.acceptCaptionWrapper}>
            <Text style={styles.acceptCaptionText}>
              ※年齢確認のため、運転免許証もしくはパスポートをアップロードして下さい。
            </Text>
          </View>
        )}
      </View>

      {!user.isAccepted && currentCertificateURL && (
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <Image style={styles.certificate} resizeMode="contain" source={{ uri: currentCertificateURL }} />
            <Text style={styles.acceptCaptionText}>※提出済み</Text>
          </View>
        </View>
      )}

      <Text style={styles.signoutText} onPress={_signOut}>
        サインアウト
      </Text>

      <TouchableOpacity style={styles.editFab} onPress={goToEdit}>
        <AntDesign color="gray" name="edit" size={24} />
      </TouchableOpacity>

      <UploadCertificateModal
        isVisible={modalTools.isVisible}
        url={uploadCertificateURL}
        onClose={modalTools.onClose}
        onUpload={onUpload}
      />
    </View>
  )
}

UserScreen.navigationOptions = () => ({
  headerTitle: 'Nomoca',
  headerBackTitle: null
})

// const hairlineWidth = StyleSheet.hairlineWidth

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: colors.inherit
  },
  editFab: {
    position: 'absolute',
    right: 26,
    bottom: 24
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400
  },
  thumbnailWrapper: {
    paddingBottom: 12
  },
  nameWrapper: {
    paddingBottom: 3
  },
  idWrapper: {
    paddingBottom: 24
  },
  isAcceptedWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 24
  },
  isNotacceptedWrapper: {
    width: 250,
    paddingBottom: 3
  },
  acceptCaptionWrapper: {
    width: 250
  },
  cardWrapper: {
    paddingBottom: 24
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 24,
    borderRadius: Platform.OS === 'ios' ? 16 : 3,
    backgroundColor: 'white',
    shadowColor: '#cccccc',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 2
  },
  certificate: {
    width: 200,
    height: 200
  },
  nameText: {
    fontSize: 18
  },
  idText: {
    fontSize: 12,
    color: 'gray'
  },
  acceptText: {
    fontSize: 14,
    color: 'white'
  },
  acceptCaptionText: {
    fontSize: 12
    // color: 'gray'
  },
  signoutText: {
    color: colors.system.blue
  }
})

export default UserScreen
