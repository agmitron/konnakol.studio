import { createBrowserRouter } from "react-router-dom";
import Dojo from "~/pages/_/ui";
import Layout from "../layout/ui";

const router = createBrowserRouter(
  [
    {
      path: "composition/:compositionId",
      element: <Dojo />,
    }
  ]
);

export default router;
