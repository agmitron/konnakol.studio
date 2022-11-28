import { createBrowserRouter } from "react-router-dom";
import LoginPage from '~/pages/auth/login/ui';
import RegisterPage from '~/pages/auth/register/ui';
import Dojo from "~/pages/dojo/ui";
import Editor from "~/pages/editor";
import Library from "~/pages/library";
import Layout from "../layout/ui";

const router = createBrowserRouter([
  {
    path: "dojo/:compositionId",
    element: (
      <Layout title="Dojo">
        <Dojo />
      </Layout>
    ),
  },
  {
    path: "library",
    element: (
      <Layout title="Library">
        <Library />
      </Layout>
    ),
  },
  {
    path: "editor/:compositionId",
    element: (
      <Layout title="Editor">
        <Editor />
      </Layout>
    ),
  },
  {
    path: 'auth/login',
    element: (
      <LoginPage />
    )
  },
  {
    path: 'auth/register',
    element: (
      <RegisterPage />
    )
  }
]);

export default router;
