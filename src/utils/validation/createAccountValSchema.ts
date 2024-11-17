import { z } from "zod";

export const createAccountValSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です。")
    .email("メールアドレスの形式が正しくありません。"),
  userId: z
    .string()
    .min(1, "ユーザーIDは必須です。")
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "英数字で入力してください。",
    }),
  name: z.string().min(1, "ユーザー名は必須です。"),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください。")
    .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i, {
      message: "パスワードは英字と数字を組み合わせて入力してください。",
    }),
});
