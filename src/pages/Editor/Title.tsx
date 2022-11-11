import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { Typography, TextField, IconButton, styled } from "@mui/material";
import { useStore } from "effector-react";
import {
  compositionNameChanged,
  editCompositionNameButtonClicked,
  saveCompositionNameButtonClicked,
  $compositionName,
  $isCompositionNameEditing,
} from "./model";

const TitleHeader = styled("header")`
  display: flex;
  column-gap: 15px;
  max-height: min-content;
`;

const Title = () => {
  const isCompositionNameEditing = useStore($isCompositionNameEditing);
  const compositionName = useStore($compositionName);

  return (
    <TitleHeader>
      {!isCompositionNameEditing ? (
        <Typography variant="h4">{compositionName}</Typography>
      ) : (
        <TextField
          value={compositionName}
          variant="standard"
          onChange={({ target: { value } }) => compositionNameChanged(value)}
        />
      )}
      {!isCompositionNameEditing ? (
        <IconButton
          color="primary"
          onClick={() => editCompositionNameButtonClicked()}
        >
          <EditIcon />
        </IconButton>
      ) : (
        <IconButton
          color="primary"
          onClick={() => saveCompositionNameButtonClicked()}
        >
          <DoneIcon />
        </IconButton>
      )}
    </TitleHeader>
  );
};

export default Title;
