import { useCookies } from "react-cookie";
import { User } from "../../types/user";

export const useUserData = () => {
  const [cookies, setCookie] = useCookies([
    "userId",
    "name",
    "icon",
    "email",
    "finalLoginAt",
  ]);

  // ユーザーデータをCookieに保存する
  const setUserData = (userData: User) => {
    const { userId, name, icon, email, finalLoginAt } = userData;
    setCookie("userId", userId, { path: "/", sameSite: "strict" });
    setCookie("name", name, { path: "/", sameSite: "strict" });
    setCookie("icon", icon, { path: "/", sameSite: "strict" });
    setCookie("email", email, { path: "/", sameSite: "strict" });
    setCookie("finalLoginAt", finalLoginAt, {
      path: "/",
      sameSite: "strict",
    });
  };

  // ユーザーデータをCookieから削除する
  const removeUserData = () => {
    setCookie("userId", "", { path: "/", maxAge: 0 });
    setCookie("name", "", { path: "/", maxAge: 0 });
    setCookie("icon", "", { path: "/", maxAge: 0 });
    setCookie("email", "", { path: "/", maxAge: 0 });
    setCookie("finalLoginAt", "", { path: "/", maxAge: 0 });
  };

  // ユーザーデータを取得する
  const getUserData = () => {
    return {
      userId: cookies.userId,
      name: cookies.name,
      icon: cookies.icon,
      email: cookies.email,
      finalLoginAt: cookies.finalLoginAt,
    };
  };

  return { setUserData, removeUserData, getUserData };
};
