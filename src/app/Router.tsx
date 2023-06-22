import { Navigate, createHashRouter } from "react-router-dom";
import { BaseRoute } from "./modules/shared/components/BaseRoute";
import { LoggedProtected } from "./modules/shared/guards/LoggedPage";
import { UnloggedProtected } from "./modules/shared/guards/UnloggedPage";
import { CreateArticlePage } from "./pages/CreateArticlePage";
import { DetailArticlePage } from "./pages/DetailArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SettingsPage } from "./pages/SettingsPage";
import { FavoritedArticlesPage } from "./pages/profile/FavoritedArticlesPage";
import { MyArticlesPage } from "./pages/profile/MyArticlesPage";
import { ProfilePage } from "./pages/profile/ProfilePage";

export const router = createHashRouter([
  {
    path: "/",
    element: <BaseRoute children={<HomePage />} />,
  },
  {
    path: "/login",
    element: <BaseRoute children={<UnloggedProtected component={LoginPage} />} />,
  },
  {
    path: "/register",
    element: <BaseRoute children={<UnloggedProtected component={RegisterPage} />} />,
  },
  {
    path: '/settings',
    element: <BaseRoute children={<LoggedProtected component={SettingsPage} />} />
  },
  {
    path: '/profile/:username',
    element: <BaseRoute children={<ProfilePage />} />,
    children: [
      { index: true, element: <MyArticlesPage /> },
      { path: 'favorites', element: <FavoritedArticlesPage /> }
    ]
  },
  {
    path: '/article/:slug',
    element: <BaseRoute children={<DetailArticlePage />} />
  },
  {
    path: '/editor',
    element: <BaseRoute children={<LoggedProtected component={CreateArticlePage} />} />
  },
  {
    path: '/editor/:slug',
    element: <BaseRoute children={<LoggedProtected component={EditArticlePage} />} />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);