import React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import { CreateArticle } from "./views/articles/create/CreateArticle";
import { EditArticle } from "./views/articles/edit/EditArticle";
import { Home } from "./views/home/Home";
import { Profile } from "./views/profile/Profile";
import { Login } from "./views/user/login/Login";
import { Register } from "./views/user/register/Register";
import { Settings } from "./views/user/settings/Settings";

export const router = createBrowserRouter([
  {
    path: '/',
    element:<Home />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/profile/:username',
    element: <Profile />
  },
  {
    path: '/editor',
    element: <CreateArticle />
  },
  {
    path: '/editor/:slug',
    element: <EditArticle />
  }
]);