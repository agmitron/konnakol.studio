import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useStore } from "effector-react";
import { IconButton, Button, ListItem, styled } from "@mui/material";
import { Tools, $tool, widgetSelected } from "~/pages/editor/model";

interface AsideProps {
  isOpen: boolean;
}

const Aside = styled("aside")`
  grid-area: sidebar;
  display: grid;
  grid-template-columns: ${(p: AsideProps) => (p.isOpen ? "2fr 8fr" : "auto")};
  min-height: 100vh;
`;

const ActivityBar = styled("ul")`
  border-right: 1px solid rgb(249, 248, 248);
  padding: 0;
`;

const ToolPanel = styled("div")`
  overflow-x: scroll;
  padding: 10px;
  background-color: rgb(249, 248, 248);
`;

const Sidebar = () => {
  const tool = useStore($tool);

  return (
    <Aside isOpen={tool !== null}>
      <ActivityBar>
        <ListItem>
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => widgetSelected(Tools.Symbols)}
          >
            <MusicNoteIcon />
          </IconButton>
        </ListItem>
      </ActivityBar>
      {tool && <ToolPanel></ToolPanel>}
    </Aside>
  );
};

export default Sidebar;
