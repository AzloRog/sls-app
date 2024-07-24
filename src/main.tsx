import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import SigninForm from "./components/ui/SigninForm.tsx";
import SignupForm from "./components/ui/SignupForm.tsx";

import store from "./store/store.ts";
import { Provider } from "react-redux";
import RootLayout from "./pages/RootLayout.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
    ],
  },
  {
    path: "/",
  },
  {
    element: <AuthPage />,
    children: [
      {
        path: "/sign-in",
        element: <SigninForm />,
      },
      {
        path: "/sign-up",
        element: <SignupForm />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
