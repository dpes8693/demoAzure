key

```md
ClientId: c59414c1-537c-43b6-a524-5a5847e3385c
SubscriptionKey: -JtDH6QXJsjcn0Vpsj2A_hoM9yuo7VlVkyRNGDretUs
datasetId: 9bf003a7-d4ed-9041-5c62-7e3af4b6029e
tilesetId: 4c7069f6-f1ae-8529-99ea-1918c8fb80d8
statesetId: 3577ceb1-f365-958d-92d5-5b6d7b7304ca
```

Maps Conversion Tool:
https://maps-diagnostic-tool.azureedge.net/setup

file:
https://mega.nz/file/jAJ1yYJb
key:私訊

---

#[Azure] Indoor Maps + Digital Twins教學
因緣際會下參加微軟workshop以下紀錄Indoor Maps從無到有的流程
首先當然要有Azure帳戶且要有一定的權限才能建立資源~
很多參數都是預設的沒有特別調整 focus在UI流程

```js=
前提情要 
key:{
    clientId
    subscriptionKey(== Primary Key)
    datasetId
    tilesetId
    statesetId
}
```
基本
<!-- ![建立資源群組](https://i.imgur.com/QWfy21L.png) -->
api-template-postman.json 匯入postman 
<!-- ![](https://i.imgur.com/s6AO41Y.png) -->



## ==Azure Maps==
1.[建立] Azure Maps Account & Creator
<!-- ![Azure Map](https://i.imgur.com/6UWdQNf.png) -->
<!-- ![輸入名稱後建立AzureMapAccount](https://i.imgur.com/jafgAA6.png) -->
![完成後要複製2組token](https://i.imgur.com/O2f1yNh.png)
進去把 "clientId"(用戶識別碼) + "PrimaryKey"(主金鑰) 存起來
接著設定Maps Creator
<!-- ![點Create](https://i.imgur.com/WMHx44I.png)
![輸入名稱和容量](https://i.imgur.com/1DbvRVz.png)
![完成後會有2個資源](https://i.imgur.com/5uEQ6Cp.png) -->



2.[上傳] zip檔案(描述.json + CAD圖檔.dwg)
要先複製2個token碼才能做下一步
到 https://maps-diagnostic-tool.azureedge.net/setup 
貼上2個token [clientId + PrimaryKey]
<!-- ![選2.0 新增zip](https://i.imgur.com/U6nu0ce.png) -->
<!-- ![點covert轉換](https://i.imgur.com/1X2Lghm.png) -->
完成後把第三,四的 "datasetId" + "tilesetId" 存起來
<!-- ![3.datasetId](https://i.imgur.com/uoFpGUm.png) -->
<!-- ![4.tilesetId](https://i.imgur.com/7hLVb2a.png) -->

3.[Postman]打POST拿"statesetId"存起來
![PrimaryKey + datasetId](https://i.imgur.com/eNCYhRB.png)
![response](https://i.imgur.com/h049Zmy.png)


4.[html]
![PrimaryKey + tilesetId + statesetId](https://i.imgur.com/0MHqhsf.png)
改完後就可以打開了html了
![完成](https://i.imgur.com/1JLFwHK.jpg)

5.[改資料&設定]


---

## ==Digital Twins==
<!-- ![Azure Digital Twins](https://i.imgur.com/QUs94GF.png) -->
