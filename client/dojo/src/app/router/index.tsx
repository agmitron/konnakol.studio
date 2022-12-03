import { createBrowserRouter } from "react-router-dom";
import LoginPage from "~/pages/auth/login/ui";
import RegisterPage from "~/pages/auth/register/ui";
import Dojo from "~/pages/dojo/ui";
import Layout from "../layout/ui";

const router = createBrowserRouter(
  [
    {
      path: "composition/:compositionId",
      element: (
        <Layout title="Dojo">
          <Dojo />
        </Layout>
      ),
    },
    // {
    //   path: "auth/login",
    //   element: <LoginPage />,
    // },
    // {
    //   path: "auth/register",
    //   element: <RegisterPage />,
    // },
  ]
);

export default router;
