# FormCoder_FRONT

プログラミング学習支援システム Form Coder のフロントエンドリポジトリです。

## FormCoder について

このアプリは、フォームの仕組みを用いて、初心者のプログラミング（コーディング）を支援してプログラミング能力の向上を目指した、プログラミング学習支援システムです。  
<img src="https://github.com/KHashimoto3/FormCoder_FRONT/assets/85172807/8a93dbcb-bdd9-42f4-9e52-303b0c96be83" width="70%" />

参考資料: https://x.gd/BTsNX

## 関連リポジトリ

バックエンド（API）リポジトリ：https://github.com/KHashimoto3/FormCoder_BACK

## 開発期間

大学院での研究として行う。  
2023 年 6 月〜2025 年 3 月

## 使用技術

フロントエンド

<div style="display: inline">
<img src="https://img.shields.io/badge/-Html5-111111.svg?logo=html5&style=flat-square">
<img src="https://img.shields.io/badge/-Css3-111111.svg?logo=css3&style=flat-square">
<img src="https://img.shields.io/badge/-Typescript-111111.svg?logo=typescript&style=flat-square">
<img src="https://img.shields.io/badge/-React-111111.svg?logo=react&style=flat-square">
</div>

バックエンド

<div style="display: inline">
<img src="https://img.shields.io/badge/-Typescript-111111.svg?logo=typescript&style=flat-square">
<img src="https://img.shields.io/badge/-Nest.js-111111.svg?logo=&style=flat-square">
</div>

データベース

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Google%20cloud%20Firestore-111111.svg?logo=google-cloud&style=flat-square">
</div>

ストレージ

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Google%20cloud%20Storage-111111.svg?logo=google-cloud&style=flat-square">
</div>

インフラ

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Firebase%20Hosting-111111.svg?logo=firebase&style=flat-square">
  <img src="https://img.shields.io/badge/-Google%20cloud-111111.svg?logo=google-cloud&style=flat-square">
  <img src="https://img.shields.io/badge/-Render-111111.svg?logo=&style=flat-square">
</div>

環境構築

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Vite-111111.svg?logo=&style=flat-square">
</div>

コード管理

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Git-111111.svg?logo=git&style=flat-square">
</div>

コード品質管理

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Eslint-111111.svg?logo=eslint&style=flat-square">
  <img src="https://img.shields.io/badge/-Eslint-111111.svg?logo=eslint&style=flat-square">
</div>

テストツール

<div style="display: inline">
  <img src="https://img.shields.io/badge/-Playwright-111111.svg?logo=&style=flat-square">
</div>

## 環境構築・実行方法

### 1. リポジトリの Clone

### 2. 環境変数の設定

`.env`ファイルをルートディレクトリに作成し、以下の環境変数を設定します。値は開発者にお問い合わせください。

```
VITE_FIREBASE_API_KEY=***
VITE_FIREBASE_AUTH_DOMAIN=***
VITE_FIREBASE_PROJECT_ID=***
VITE_FIREBASE_STORAGE_BUCKET=***
VITE_FIREBASE_MESSAGING_SENDER_ID=***
VITE_FIREBASE_APP_ID=***

VITE_API_BASE_URL=***
```

### 3. モジュールインストール

以下のコマンドでモジュールをインストールします。

```
npm i
```

### 4. サーバ起動

以下のコマンドで Vite のサーバを起動します。

```
npm run dev
```

### 5. 起動確認

`localhost:5173`にアクセスして、トップページが表示されれば完了です。
