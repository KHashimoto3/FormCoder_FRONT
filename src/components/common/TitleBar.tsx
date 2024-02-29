import { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Tooltip,
  Avatar,
} from "@mui/material";
import { useHistory } from "react-router-dom";

import { useUserData } from "./hooks/useUserData";

interface Pages {
  pageName: string;
  pagePath: string;
}

const pages: Pages[] = [
  { pageName: "FormCoderとは", pagePath: "/" },
  { pageName: "フォーム一覧", pagePath: "/learning" },
];

export const TitleBar = () => {
  const history = useHistory();

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("ようこそ");
  const [avatarImage, setAvatarImage] = useState<string>("");
  const [loginUser, setLoginUser] = useState<boolean>(false);

  const [anchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const { getUserData, removeUserData } = useUserData();

  const settings = [
    {
      label: "ダッシュボード",
      path: "/dashboard/" + userId,
    },
    {
      label: "アカウント設定",
      path: "/dashboard/" + userId,
    },
    {
      label: "ログアウト",
      path: "/",
    },
  ];

  useEffect(() => {
    const userData = getUserData();
    if (userData.userId !== undefined) {
      setLoginUser(true);
      setUserId(userData.userId);
      setUserName(userData.name);
      setAvatarImage(userData.icon);
    }
  }, []);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    removeUserData();
    setLoginUser(false);
    location.href = "/";
  };

  const handleSettings = (path: string) => {
    if (path === "/") {
      logout();
    }
    location.href = path;
  };

  const buttonStyle = {
    color: "#fff",
    background:
      "linear-gradient(90deg, rgba(51,202,255,1) 0%, rgba(0,118,249,1) 100%)",
    boxShadow: "0 3px 5px 0 rgba(0, 0, 0, .3)",
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "#fff",
        borderRadius: "10px",
        position: "fixed",
        marginTop: "15px",
        zIndex: "1000",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#000",
              textDecoration: "none",
            }}
          >
            FormCoder
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.pageName}>
                  <Typography textAlign="center">{page.pageName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FormCoder
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.pageName}
                sx={{
                  my: 2,
                  color: "#000",
                  display: "block",
                  fontSize: "14pt",
                }}
                onClick={() => history.push(page.pagePath)}
              >
                {page.pageName}
              </Button>
            ))}
          </Box>

          {loginUser ? (
            <>
              <Box sx={{ flexGrow: 0.03, display: { xs: "none", md: "flex" } }}>
                <Typography variant="body1" sx={{ color: "#000" }}>
                  {userName}
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="アカウントメニューを開く">
                  <Button onClick={handleOpenUserMenu}>
                    <Avatar sx={{ width: 30, height: 30 }} src={avatarImage} />
                  </Button>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.label}
                      onClick={() => handleSettings(setting.path)}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <Button
              variant="contained"
              style={buttonStyle}
              onClick={() => history.push("/login")}
            >
              ログイン
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
