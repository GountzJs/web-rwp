import React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import { 
  CreateArticle, 
  EditArticle, 
  Home, 
  Profile, 
  Login, 
  Register, 
  Settings
} from "@/app/views";

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