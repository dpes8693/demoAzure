key

```md
AzureMapsAccount()
ClientId: c59414c1-537c-43b6-a524-5a5847e3385c
SubscriptionKey(PrimaryKey): -JtDH6QXJsjcn0Vpsj2A_hoM9yuo7VlVkyRNGDretUs
datasetId: 9bf003a7-d4ed-9041-5c62-7e3af4b6029e
tilesetId: 4c7069f6-f1ae-8529-99ea-1918c8fb80d8
statesetId: 3577ceb1-f365-958d-92d5-5b6d7b7304ca
featureId: "UNIT17"

DigitalTwinsResource()
Host name: DigitalTwinsResource.api.wcus.digitaltwins.azure.net

AzureADapplication()
Application (client) ID: c2880b35-28fb-44eb-957d-b0c2241b50b6
Directory (tenant) ID: 91c2e6c6-8af9-444c-a2ed-94c579eaeb56
Value: K4H7Q~JGNEPL2F9HlEKmtzkckahB66-h97iC1
SecretID: e0a770de-c857-4609-be3f-a52db189e7a6
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

來看一下費用:
![](https://i.imgur.com/PThSEa5.png)
Maps 一天要250NT以上...

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
![建立資源群組](https://i.imgur.com/QWfy21L.png)
api-template-postman.json 匯入postman 
![](https://i.imgur.com/s6AO41Y.png)



part 1
/Resource groups/Azure Maps
## ==Azure Maps==
1.[建立] Azure Maps Account & Creator
![Azure Map](https://i.imgur.com/6UWdQNf.png)
![輸入名稱後建立AzureMapAccount](https://i.imgur.com/jafgAA6.png)
![完成後要複製2組token](https://i.imgur.com/O2f1yNh.png).

==clientId +PrimaryKey==

進去把 "clientId"(用戶識別碼) + "PrimaryKey"(主金鑰) 存起來
接著設定Maps Creator
![點Create](https://i.imgur.com/WMHx44I.png)
![輸入名稱和容量](https://i.imgur.com/1DbvRVz.png)
![完成後會有2個資源](https://i.imgur.com/5uEQ6Cp.png)



2.[上傳] zip檔案(描述.json + CAD圖檔.dwg)
要先複製2個token碼才能做下一步
到 https://maps-diagnostic-tool.azureedge.net/setup 
貼上2個token [clientId + PrimaryKey]
![選2.0 新增zip](https://i.imgur.com/U6nu0ce.png)
![點covert轉換](https://i.imgur.com/1X2Lghm.png)

==datasetId+tilesetId==

完成後把第三,四的 "datasetId" + "tilesetId" 存起來
![3.datasetId](https://i.imgur.com/uoFpGUm.png)
![4.tilesetId](https://i.imgur.com/7hLVb2a.png)

==statesetId==

3.[Postman]打POST拿"statesetId"存起來
![PrimaryKey + datasetId](https://i.imgur.com/eNCYhRB.png)
![response](https://i.imgur.com/h049Zmy.png)


4.[html]
![PrimaryKey + tilesetId + statesetId](https://i.imgur.com/0MHqhsf.png)
改完後就可以打開了html了
![完成](https://i.imgur.com/1JLFwHK.jpg)

5.[改資料&設定]

==featureId==

example
featureId: "UNIT17"
![](https://i.imgur.com/7VSOrUU.png)
![](https://i.imgur.com/DDwlkF1.png)


---
part 2 
/Function App /Azure Function

/Resource groups/Azure Digital Twins
/Resource groups/Azure Maps Creator Resource

/Azure Active Directory /App registrations /AzureADapplication(API permissions)
## ==Digital Twins Sidebar==
![Azure Digital Twins](https://i.imgur.com/QUs94GF.png)
Digital Twin Definition Language (DTDL)
創建 Digital Twins 資源
[建立] Azure Digital Twins
![建立](https://i.imgur.com/JIugUop.png)
![點此進入ADT Explorer](https://i.imgur.com/YSIcI56.png)
![上傳DTDLmodel.json來 新增節點](https://i.imgur.com/xTFK55X.png)
![完成](https://i.imgur.com/jAJS1Cq.png)

==Host name==

![](https://i.imgur.com/4cfXYXl.png)


![...新增twin](https://i.imgur.com/wLji4MT.png)
![取名](https://i.imgur.com/lHoBh83.png)
![完成圖](https://i.imgur.com/6uUCGua.png)
![對UNIT做設定](https://i.imgur.com/pjuIF7w.png)

建立連結
![點1顆按下shift再第二顆後 點右鍵](https://i.imgur.com/AMkmEQe.png)
![contains save](https://i.imgur.com/ItHoy08.png)
![完成](https://i.imgur.com/depyoWL.png)

記得save存檔

建立AzureADapplication
![到AAD 新增AzureADapplication](https://i.imgur.com/mXL1vNz.png)
![照抄](https://i.imgur.com/m40EXJR.png)

==client ID + tenant ID==

![完成 複製client ID + tenant ID](https://i.imgur.com/YVZAELk.png)

==SecretID + Value==
![到Certificates](https://i.imgur.com/WJbHVYQ.png)
![拿Value SecretID](https://i.imgur.com/5sAtAhd.png)

建完後要賦予API權限
![點+](https://i.imgur.com/2Yv8T2O.png)
![搜尋Azure Digital Twins](https://i.imgur.com/SxDRmh9.png)
![打勾 送出](https://i.imgur.com/i56HuWi.png)
![成功](https://i.imgur.com/x1NfEtH.png)

回到DigitalTwinsResource
![IAM](https://i.imgur.com/Pgdt2Rx.png)
![+ role指派](https://i.imgur.com/pTgJdI2.png)
![選Owner 下一步](https://i.imgur.com/qas8KE5.png)
![+ select member](https://i.imgur.com/yRT6tcG.png)
搜尋AzureADapplication
![完成](https://i.imgur.com/DHyAtX5.png)

好基本設定+權限也都好了 
剩下把Digital Twins API丟入Azure Function

開啟VScode 安裝套件
![Azure Function](https://i.imgur.com/wXngFQB.png)
![點套件 新建專案](https://i.imgur.com/FRGgzFP.png)
選資料夾>>javascript>>HTTP trigger>>名稱:HTTP trigger1>>Function
![建立好會多一個資料夾](https://i.imgur.com/aindH6B.png)
此外外面還會新增host.json package.json

做3件事情(這邊很多步驟 省略圖片講重點)
1.將package.json 新增dependencies axiois
![](https://i.imgur.com/8p5AMnw.png)
2.覆蓋index.js
3.改id
![四個](https://i.imgur.com/Rt8yDfc.png)

新增了2個{Http Trigger1,Trigger2}

![點按鈕](https://i.imgur.com/KGw4il9.png)
![](https://i.imgur.com/ll5OAVz.png)
create new>>Nameing>>runtime stack=3>>14LTS>>East US
推上去Azure 搜尋:Function App
![Azure上可以看到url](https://i.imgur.com/oTxt8t3.png)
![剛剛做的2個Functions](https://i.imgur.com/3x8FxNI.png)

點進去可以拿到Function URL
![](https://i.imgur.com/gOsSLkH.png)

==Function URL*2==

保險起見Azure Function 記得開CORS 存檔
![](https://i.imgur.com/UWXs1dd.png)

最後回到code 做2件事
1.將indoor-Taya.js 前三個改掉
![](https://i.imgur.com/ePbCytx.png)
2.將剛剛複製的function url貼上
![](https://i.imgur.com/WI5Yu3A.png)

![完成後點block名稱就會變了](https://i.imgur.com/K0pQFk5.png)
點不同區域 名稱會不同
如果DigitalTwinResource正常這邊狀態也會抓出來(打POST)


---
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
![建立資源群組](https://i.imgur.com/QWfy21L.png)
api-template-postman.json 匯入postman 
![](https://i.imgur.com/s6AO41Y.png)



## ==Azure Maps==
1.[建立] Azure Maps Account & Creator
![Azure Map](https://i.imgur.com/6UWdQNf.png)
![輸入名稱後建立AzureMapAccount](https://i.imgur.com/jafgAA6.png)
![完成後要複製2組token](https://i.imgur.com/O2f1yNh.png)
進去把 "clientId"(用戶識別碼) + "PrimaryKey"(主金鑰) 存起來
接著設定Maps Creator
![點Create](https://i.imgur.com/WMHx44I.png)
![輸入名稱和容量](https://i.imgur.com/1DbvRVz.png)
![完成後會有2個資源](https://i.imgur.com/5uEQ6Cp.png)



2.[上傳] zip檔案(描述.json + CAD圖檔.dwg)
要先複製2個token碼才能做下一步
到 https://maps-diagnostic-tool.azureedge.net/setup 
貼上2個token [clientId + PrimaryKey]
![選2.0 新增zip](https://i.imgur.com/U6nu0ce.png)
![點covert轉換](https://i.imgur.com/1X2Lghm.png)
完成後把第三,四的 "datasetId" + "tilesetId" 存起來
![3.datasetId](https://i.imgur.com/uoFpGUm.png)
![4.tilesetId](https://i.imgur.com/7hLVb2a.png)

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
![Azure Digital Twins](https://i.imgur.com/QUs94GF.png)
Digital Twin Definition Language (DTDL)
創建 Digital Twins 資源
1.[建立] Azure Digital Twins