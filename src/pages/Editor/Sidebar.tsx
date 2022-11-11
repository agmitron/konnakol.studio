import AddIcon from "@mui/icons-material/Add";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import classNames from "classnames";
import { useStore } from "effector-react";
import { IconButton, Button, ListItem, styled } from "@mui/material";
import Note from "~/entities/unit/note/ui";
import { $widget, Widgets, widgetSelected } from "~/pages/editor/model";
import { $units } from "~/entities/user/model";

import { popup as createUnitPopup } from "~/widgets/dialog/unit/create/model";
import { unitChosen } from "~/widgets/dialog/unit/edit/model";

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

const Widget = styled("div")`
  overflow-x: scroll;
  padding: 10px;
  background-color: rgb(249, 248, 248);
`;

const Units = styled("div")`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 5px;
`;

const UnitButton = styled(IconButton)`
  width: min-content;
`;

const Sidebar = () => {
  const widget = useStore($widget);
  const units = useStore($units);

  return (
    <Aside isOpen={widget !== null}>
      <ActivityBar>
        <ListItem>
          <IconButton
            size="medium"
            color="secondary"
            onClick={() => widgetSelected(Widgets.Units)}
          >
            <MusicNoteIcon />
          </IconButton>
        </ListItem>
      </ActivityBar>
      {widget && (
        <Widget>
          <Units>
            {units.map(({ symbol }, i) => (
              <div className="toolbar__unit-button" key={i}>
                <Button variant="outlined" onClick={() => unitChosen(i)}>
                  <Note symbol={symbol} />
                </Button>
              </div>
            ))}
            <UnitButton color="primary" onClick={() => createUnitPopup.open()}>
              <AddIcon />
            </UnitButton>
          </Units>
        </Widget>
      )}
    </Aside>
  );
};

export default Sidebar;
