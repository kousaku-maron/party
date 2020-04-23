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

### 環境変数

`.env.sample`を参考に`.env`を作成する。

```
API_KEY= // 不要
AUTH_DOMAIN=　// 必須
DATABASE_URL=　// 必須
PROJECT_ID=　// 必須
STORAGE_BUCKET=　// 必須
MESSAGING_SENDER_ID=　// 必須
FACEBOOK_APP_ID=　// 不要
GOOGLE_CLIENT_ID_FOR_IOS=　// 必須
GOOGLE_CLIENT_ID_FOR_ANDROID=　// 必須
GOOGLE_REDIRECT_URL=　// expoビルドの場合は不要、ネイティブビルドの場合は必須
EXPO_EXPERIENCE_ID= // expoビルドの場合は不要、ネイティブビルドの場合は必須
```

# push通知の設定

**Expo Clientでのpush通知であればこのセクションの設定は不要。**

### 手順詳細
https://qiita.com/mildsummer/items/5acc267152449c86b2b1

### 手順

下記コマンドで`Push Notifications Key`をexpoプロジェクトに紐付ける。

```
expo credentials:manager
```

下記コマンドでFCMサーバーキーをexpoにアップロードする。

```
expo push:android:upload --api-key <サーバーキー>
```

ネイティブビルドの場合、プッシュ通知で`google-services.json`が必要になる。

firebaseコンソールから該当する`google-services.json`をダウンロードし、`android/app`直下に設置する。

`.env`に`EXPO_EXPERIENCE_ID`を`@<ユーザー名>/<プロジェクト名>`の形式で設定する。
