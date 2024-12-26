# FormCoder_FRONT

プログラミング学習支援システム Form Coder のフロントエンドリポジトリです。

## FormCoder について

このアプリは、フォームの仕組みを用いて、初心者のプログラミング（コーディング）を支援してプログラミング能力の向上を目指した、プログラミング学習支援システムです。  
<img src="https://github.com/user-attachments/assets/88e3eb5e-dc80-4510-b7d8-27eab269c898" width="70%" />

参考資料: https://x.gd/BTsNX

## 関連リポジトリ

バックエンド（API）リポジトリ：https://github.com/KHashimoto3/FormCoder_BACK

## 開発期間

大学院での研究として行う。  
2023 年 6 月〜2025 年 3 月

## ディレクトリ構成

https://docs.google.com/document/d/13y7rhlHK7xEt1vqXHDnjzAAgzSV4F6oMcV_QgaLlkWk/edit?usp=sharing

## 使用技術

| 領域           | 技術                                    |
| -------------- | --------------------------------------- |
| フロントエンド | HTML, CSS, TypeScript, React, MUI, Vite |
| バックエンド   | Google Cloud, Nest.js, TypeScript       |
| データベース   | Cloud Firestore                         |
| ストレージ     | Cloud Storage                           |
| インフラ       | Firebase, Render                        |
| CI/CD          | Github Actions                          |
| ツール         | git, ESLint, Prettier, Playwright       |

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

## デプロイ方法
### 手動デプロイ
1. 以下のコマンドでデプロイします。
```
npm run build
firebase deploy
```
### 自動デプロイ
`develop`から`main`に対してpull requestを出して、mergeする。
