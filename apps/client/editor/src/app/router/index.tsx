import { createBrowserRouter } from "react-router-dom";
import Editor from "~/pages/_";

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Editor will be here</h1>,
  },
  {
    path: "composition/:compositionId",
    element: <Editor />,
  },
]);

export default router;
