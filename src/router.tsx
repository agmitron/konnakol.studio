import { createBrowserRouter } from "react-router-dom";
import Dojo from "./pages/dojo/ui";
import Editor from './pages/editor';
import Library from "./pages/library/ui";

const router = createBrowserRouter([
  {
    path: "dojo/:compositionId",
    element: <Dojo />,
  },
  {
    path: "library",
    element: <Library />,
  },
  {
    path: "editor/:compositionId",
    element: <Editor />,
  },
]);

export default router;
