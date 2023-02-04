import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { Typography, TextField, IconButton, styled } from "@mui/material";
import { useStore } from "effector-react";
import {
  compositionNameChanged,
  editCompositionNameButtonClicked,
  compositionNameSaved,
  $compositionName,
  $isCompositionNameEditing,
} from "./model";

const TitleHeader = styled("header")`
  display: flex;
  align-items: center;
  column-gap: 15px;
  max-height: min-content;
`;

const TitleInput = styled(TextField)`
  .MuiInput-root {
    font-size: 2.125rem;
  }
`

const Title = () => {
  const isCompositionNameEditing = useStore($isCompositionNameEditing);
  const compositionName = useStore($compositionName);

  if (isCompositionNameEditing) {
    return (
      <TitleHeader>
        <TitleInput
          value={compositionName}
          variant="standard"
          onChange={({ target: { value } }) => compositionNameChanged(value)}
          onKeyDown={(e) => e.key === "Enter" && compositionNameSaved()}
        />
        <IconButton color="primary" onClick={() => compositionNameSaved()}>
          <DoneIcon />
        </IconButton>
      </TitleHeader>
    );
  }

  return (
    <TitleHeader>
      <Typography variant="h4">{compositionName}</Typography>
      <IconButton
        color="primary"
        onClick={() => editCompositionNameButtonClicked()}
      >
        <EditIcon />
      </IconButton>
    </TitleHeader>
  );
};

export default Title;
