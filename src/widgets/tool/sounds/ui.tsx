import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, IconButton } from "@mui/material";
import { useStore, useStoreMap } from "effector-react";
import Sound from "~/entities/unit/sound/ui";
import { $sounds } from "~/entities/user/model";
import ContextMenu, {
  SoundsContextMenuGroups,
} from "~/widgets/context-menu/ui";
import { popup as createUnitPopup } from "~/widgets/tool/sounds/dialog/unit/create/model";
import {
  $contextMenuAnchorElement,
  contextMenuClosed,
  contextMenuOpened,
  deleteButtonClicked,
  editButtonClicked,
} from "./model";

const Root = styled("div")`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 8px;
  gap: 5px;
`;

const UnitButton = styled(IconButton)`
  width: min-content;
`;

const groups: SoundsContextMenuGroups = [
  [
    {
      text: "Edit",
      Icon: EditIcon,
      action: editButtonClicked,
    },
    {
      text: "Delete",
      Icon: DeleteIcon,
      action: deleteButtonClicked,
    },
  ],
];

const Sounds = () => {
  const units = useStore($sounds);
  const anchorElement = useStore($contextMenuAnchorElement);
  const isContextMenuOpen = useStoreMap($contextMenuAnchorElement, Boolean);

  return (
    <Root>
      {units.map(({ symbol }, i) => (
        <div className="toolbar__unit-button" key={i}>
          <Button
            variant="outlined"
            onClick={(e) => contextMenuOpened([e.currentTarget, i])}
          >
            <Sound symbol={symbol} />
          </Button>
        </div>
      ))}
      <UnitButton color="primary" onClick={() => createUnitPopup.open()}>
        <AddIcon />
      </UnitButton>
      <ContextMenu
        groups={groups}
        isOpen={isContextMenuOpen}
        anchor={anchorElement}
        onClose={contextMenuClosed}
      />
    </Root>
  );
};

export default Sounds;
