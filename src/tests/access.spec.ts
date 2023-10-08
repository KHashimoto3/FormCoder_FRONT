import { test, expect } from "@playwright/test";

test("トップページにアクセスすると、タイトルの文字が表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  const title = await page.getByTestId("home-title");
  //home-titleがフォームを使ったプログラミング学習であることを確認する。
  await expect(title).toContainText("フォームを使ったプログラミング学習");
});

/*test("存在するフォームにアクセスすると、「ヒント非表示」が表示される。", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/form?form=experiment1");
  const hintTitle = await page.getByTestId("hint-title");
  //ヒントのタイトルに、「ヒント非表示」が表示されていることを確認する。
  await expect(hintTitle).toContainText("ヒント非表示");
});

test("存在しないフォームにアクセスすると、フォームの読み込みに失敗し、「ヒント読み込み中」のままになる。", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/form?form=blank");
  const hintTitle = await page.getByTestId("hint-title");
  //ヒントのタイトルに、「ヒント非表示」が表示されていることを確認する。
  await expect(hintTitle).toContainText("ヒント読みこ中");
});
*/
