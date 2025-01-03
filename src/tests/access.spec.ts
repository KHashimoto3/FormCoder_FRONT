import { test, expect } from "@playwright/test";

test("トップページにアクセスすると、タイトルの文字が表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  const title = await page.getByTestId("home-title");
  //home-titleがフォームを使ったプログラミング学習であることを確認する。
  await expect(title).toContainText("フォームを使ったプログラミング学習");
});

/*test("トップページにあるログインボタンをクリックすると、ログインページに遷移する", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  const loginButton = await page.getByTestId("login-button");
  await loginButton.click();
  await expect(page.url()).toBe("http://localhost:5173/login");

  const loginPageTitle = await page.getByTestId("login-page-title");
  await expect(loginPageTitle).toBeVisible();
});

test("ログインページ内に、２つのテキストフィールドとログインボタンが表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/login");
  const userIdField = await page.getByTestId("user-id-field");
  const userPasswordField = await page.getByTestId("user-password-field");
  const loginButton = await page.getByTestId("login-button");

  await expect(userIdField).toBeVisible();
  await expect(userPasswordField).toBeVisible();
  await expect(loginButton).toBeVisible();
});

test("未入力の状態でログインボタンをクリックすると、エラーメッセージが表示される", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/login");
  const loginButton = await page.getByTestId("login-button");
  await loginButton.click();

  const inputMissedAlert = await page.getByTestId("input-missed-alert");
  await expect(inputMissedAlert).toBeVisible();
  const loginFailedAlert = await page.getByTestId("login-failed-alert");
  await expect(loginFailedAlert).not.toBeVisible();
});*/
