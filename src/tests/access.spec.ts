import { test, expect } from "@playwright/test";

test("トップページにアクセスすると、タイトルの文字が表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  const title = await page.getByTestId("home-title");
  //home-titleがフォームを使ったプログラミング学習であることを確認する。
  await expect(title).toContainText("フォームを使ったプログラミング学習");
});
