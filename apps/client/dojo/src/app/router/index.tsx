import { createBrowserRouter } from "react-router-dom";
import Dojo from "~/pages/_/ui";
import Layout from "../layout/ui";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <h1>Dojo will be here</h1>,
    },
    {
      path: "composition/:compositionId",
      element: <Dojo />,
    }
  ]
);

export default router;
