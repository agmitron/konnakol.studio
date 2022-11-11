import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { Typography, TextField, IconButton } from "@mui/material";
import { useStore } from "effector-react";
import {
  compositionNameChanged,
  editCompositionNameButtonClicked,
  saveCompositionNameButtonClicked,
  $compositionName,
  $isCompositionNameEditing,
} from "./model";

const Title = () => {
  const isCompositionNameEditing = useStore($isCompositionNameEditing);
  const compositionName = useStore($compositionName);

  return (
    <header className="editor__title">
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
    </header>
  );
};

export default Title;
