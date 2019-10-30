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
