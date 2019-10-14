import React, { useCallback } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { UserScreenState, UserScreenActions } from '../containers/UserScreen'
import { useUser } from '../services/user'
import { useCertificate } from '../services/secure'
import { useModal } from '../services/modal'
import { View, Text, Image, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, Fab, Thumbnail } from '../components/atoms'
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
      <View style={styles.editFab}>
        <Fab color="#3498db" onPress={goToEdit}>
          <AntDesign color="white" name="edit" size={24} />
        </Fab>
      </View>

      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={user.thumbnailURL} size={200} />
      </View>

      <View style={styles.nameWrapper}>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>

      {user.isAccepted && (
        <View style={styles.isAcceptedWrapper}>
          <Text style={styles.acceptCaptionText}>本人確認済み</Text>
        </View>
      )}

      {!user.isAccepted && (
        <View style={styles.isNotacceptedWrapper}>
          <RoundedButton fullWidth={true} onPress={_pickCertificateImage}>
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

      {!user.isAccepted && currentCertificateURL && (
        <View style={styles.certificateWrapper}>
          <Image style={styles.certificate} resizeMode="contain" source={{ uri: currentCertificateURL }} />
          <Text style={styles.acceptCaptionText}>※提出済み</Text>
        </View>
      )}

      <RoundedButton onPress={_signOut}>
        <Text>サインアウト</Text>
      </RoundedButton>

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  editFab: {
    position: 'absolute',
    right: 24,
    bottom: 24
  },
  thumbnailWrapper: {
    paddingVertical: 24
  },
  nameWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24
  },
  isAcceptedWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 24
  },
  isNotacceptedWrapper: {
    width: 250,
    paddingBottom: 8
  },
  acceptCaptionWrapper: {
    width: 250,
    paddingBottom: 24
  },
  certificateWrapper: {
    paddingBottom: 24
  },
  certificate: {
    width: 200,
    height: 200
  },
  nameText: {
    fontSize: 24
  },
  acceptText: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14
  },
  acceptCaptionText: {
    fontSize: 12
  }
})

export default UserScreen
