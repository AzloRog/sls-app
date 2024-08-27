import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import SigninForm from "./components/SigninForm.tsx";
import SignupForm from "./components/SignupForm.tsx";

import store from "./store/store.ts";
import { Provider } from "react-redux";
import RootLayout from "./pages/RootLayout.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";

const router = createMemoryRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/sls-app",
          element: <HomePage />,
        },
        {
          path: "/create-post",
          element: <CreatePostPage />,
        },
      ],
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
  ],
  { initialEntries: ["/sls-app"] }
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
