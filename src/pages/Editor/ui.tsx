import { useParams } from "react-router-dom";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
} from "@mui/material";
import PlayIcon from "@mui/icons-material/PlayArrow";
import SaveIcon from "@mui/icons-material/Save";
import ShareIcon from "@mui/icons-material/Share";
import Sheet from "~/features/konnakol/ui";
import CreateUnitDialog from "~/widgets/tool/sounds/dialog/unit/create/ui";
import EditUnitDialog from "~/widgets/tool/sounds/dialog/unit/edit/ui";
import Sidebar from "./Sidebar";
import Title from "./Title";
import Header from "~/widgets/header/ui";

const actions = [
  { icon: <PlayIcon />, name: "Play", onClick: () => {} },
  { icon: <SaveIcon />, name: "Save", onClick: () => {} },
  { icon: <ShareIcon />, name: "Share", onClick: () => {} },
];

const Root = styled("main")`
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar workspace"
    "sidebar workspace";
  grid-template-columns: auto 8fr;
  grid-template-rows: min-content auto;
  height: 100%;
  column-gap: 20px;
`;

const Workspace = styled("div")`
  grid-area: workspace;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

function Editor() {
  const { compositionId } = useParams();

  return (
    <Root>
      <Header title="Editor" area="header" />
      <Sidebar />
      <Workspace>
        <Title />
        <Sheet />
      </Workspace>
      <CreateUnitDialog />
      <EditUnitDialog />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Root>
  );
}

export default Editor;
