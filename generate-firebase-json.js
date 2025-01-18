//dotenvを使って環境変数を読み込む
import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

//環境変数を取得
const firebaseApiConfig = {
  apiUrl: process.env.VITE_API_BASE_URL || "",
  databaseName: process.env.VITE_API_DATABASE_NAME || "",
};

const firebaseJsonTemplate = {
  hosting: {
    public: "dist",
    ignore: ["firebase.json", "**/.*", "**/node_modules/**"],
    rewrites: [
      {
        source: "/api/**",
        destination: `${firebaseApiConfig.apiUrl}/**`,
      },
      {
        source: "**",
        destination: "/index.html",
      },
    ],
  },
  firestore: [
    {
      database: `${firebaseApiConfig.databaseName}`,
      rules: `firestore.${firebaseApiConfig.databaseName}.rules`,
      indexes: `firestore.${firebaseApiConfig.databaseName}.indexes.json`,
    },
  ],
};

fs.writeFileSync(
  "./firebase.json",
  JSON.stringify(firebaseJsonTemplate, null, 2),
  "utf-8"
);

console.log("firebase.json generated successfully");
