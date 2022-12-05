import { createBrowserRouter } from "react-router-dom";
import Editor from "~/pages/_";

const router = createBrowserRouter([
  {
    path: "composition/:compositionId",
    element: <Editor />,
  },
]);

export default router;
