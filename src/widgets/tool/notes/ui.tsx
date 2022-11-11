import styled from "@emotion/styled";
import AddIcon from "@mui/icons-material/Add";
import { Button, IconButton } from "@mui/material";
import { useStore } from "effector-react";
import Note from "~/entities/unit/note/ui";
import { $units } from "~/entities/user/model";
import { popup as createUnitPopup } from "~/widgets/dialog/unit/create/model";
import { unitChosen } from "~/widgets/dialog/unit/edit/model";

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

const Notes = () => {
  const units = useStore($units);

  return (
    <Root>
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
    </Root>
  );
};

export default Notes;
