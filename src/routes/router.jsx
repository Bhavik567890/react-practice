import { createBrowserRouter } from "react-router-dom";
import RootLayOut from "../layout/root-layout.jsx";
import AuthLayout from "../layout/auth-layout";
export const router = createBrowserRouter([
  {
    element: <RootLayOut />,

    children: [
      {
        path: "/",

        lazy: async () => {
          let { Home } = await import("../components");
          return { Component: Home };
        },
      },
      {
        path: "chat",
        lazy: async () => {
          let { ChatPage } = await import("../components/chat/chat-page.jsx");
          return {
            Component: ChatPage,
          };
        },
      },
      {
        path: "video",
        lazy: async () => {
          let { VideoCall } = await import("../components");
          return { Component: VideoCall };
        },
      },
      {
        path: "scratch",
        lazy: async () => {
          let { ScratchCard } = await import("../components");
          return {
            Component: ScratchCard,
          };
        },
      },
      {
        path: "contact",
        lazy: async () => {
          let { ContactPage } = await import("../components");
          return {
            Component: ContactPage,
          };
        },
      },
      {
        path: "contact/:id",
        lazy: async () => {
          let { ContactDetailsPage } = await import(
            "../components/contact/contact-detail.jsx"
          );
          return {
            Component: ContactDetailsPage,
          };
        },
      },
    ],
  },

  {
    element: <AuthLayout />,

    children: [
      {
        path: "login",
        lazy: async () => {
          let { LogIn } = await import("../components/login/login");
          return { Component: LogIn };
        },
      },
      {
        path: "register",
        lazy: async () => {
          let { LogIn } = await import("../components/login/login");
          return { Component: LogIn };
        },
      },
      {
        path: "forgot-password",
        lazy: async () => {
          let { ForgotPassWord } = await import("../components/forgot-password/forgot-password.jsx");
          return { Component: ForgotPassWord };
        },
      },
    ],
  },
  {
    path: "*",
    lazy: async () => {
      let { Notfound } = await import("../components/not-found");
      return { Component: Notfound };
    },
  },
]);
