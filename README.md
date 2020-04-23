# GET STARTED

下記コード実行後、Chromeにてdevelopper画面が開くので、`launch ios simulator`をクリック。

※詳しくは、[https://docs.expo.io/versions/v35.0.0/workflow/exploring-managed-workflow/](https://docs.expo.io/versions/v35.0.0/workflow/exploring-managed-workflow/)参照。

```
yarn
yarn start
```

# 環境

nodeの12系推奨。
※13系だとfirebaseのライブラリで使用しているgrpcのインストールで失敗してしまったので。

# firebase configの設定

`.env.sample`を参考に、`.env`ファイルを作成する。

# FCMの設定
### 手順

FirebaseからGoogle設定ファイルをダウンロード
- GoogleService-Info.plist
- google-services.json

Apple Developer ProgramのアカウントページでAPNs認証キーを取得し、Firebaseにアップロード。([詳細](https://firebase.google.com/docs/cloud-messaging/ios/certs?hl=JA#create_the_authentication_key))

XCodeにてCapabilityに下記の項目を追加
- Push Notification
- Background Modes（Remote Notificationsをチェック)

##### XCodeにて`GoogleService-Info.plist`を追加する。

※注意点として、**Copy items if needed**にチェックすること。

androidは試していないため、ビルドがうまく行くかはわからない。

### 参考記事
https://qiita.com/mildsummer/items/0ace4fcc9f1609713fec
https://docs.expo.io/guides/setup-native-firebase/
