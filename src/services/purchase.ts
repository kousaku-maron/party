import * as InAppPurchases from 'expo-in-app-purchases'

//MEMO: app storeの申請許可がいつか分からず，conflictが起きるのを防ぐため以下のTODOは申請許可後に実行する．
//TODO: listernPurchase() をApp.tsxのstoreを定義している次の行に書く
export const listernPurchase = () => {
  try {
    InAppPurchases.connectAsync()
  } catch (e) {
    console.warn('Failed to connectAsync', e)
  }

  InAppPurchases.setPurchaseListener(({ responseCode, results, errorCode }) => {
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      results.forEach(purchase => {
        if (!purchase.acknowledged) {
          console.log(`Successfully purchased ${purchase.productId}`)
          //TODO:flashCardで showPurchaseFailurMessage 作成

          InAppPurchases.finishTransactionAsync(purchase, true)
        }
      })
    }

    if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
      console.log('User canceled the transaction')
      //TODO:flashCardで showPurchaseFailurMessage 作成
    } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
      console.log('User does not have permissions to buy but requested parental approval (iOS only)')
      //TODO:flashCardで showPurchaseFailurMessage 作成
    } else {
      console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`)
      //TODO:flashCardで showPurchaseFailurMessage 作成
    }
  })
}
