import { createBrowserRouter } from "react-router-dom";
import Dojo from "~/pages/dojo/ui";
import Editor from "~/pages/editor/ui";
import Library from "~/pages/library";
import Layout from "../../widgets/header/ui";

const router = createBrowserRouter([
  {
    path: "dojo/:compositionId",
    element: <Dojo />,
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
    element: <Editor />,
  },
]);

export default router;
