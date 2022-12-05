import { createBrowserRouter } from "react-router-dom";
import Editor from "~/pages/_";
import Layout from "../layout/ui";

const router = createBrowserRouter(
  [
    {
      path: "composition/:compositionId",
      element: (
        <Layout title="Editor">
          <Editor />
        </Layout>
      ),
    }
  ]
);

export default router;
