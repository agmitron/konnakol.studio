import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useStore, useStoreMap } from "effector-react";
import FrequenciesGrid from "~/widgets/tool/sounds/dialog/unit/shared/FrequenciesGrid";
import { created, form, popup } from "../model";

function CreateUnitDialog() {
  const frequencies = useStore(form.frequencies.$store);
  const symbol = useStoreMap(form.$store, (f) => f.symbol);
  const pitching = useStore(form.frequencies.$listening);
  const isOpen = useStore(popup.$isOpen);

  return (
    <Dialog open={isOpen} onClose={() => popup.close()} fullWidth>
      <DialogTitle>Add a sound</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Music consists of simple combined sounds. Here you create sounds and
          associate them with symbols, to make it simpler to write down your
          composition. You can use any symbol except "." (dot) and " " (space).
        </DialogContentText>
        <TextField
          fullWidth
          margin="dense"
          label="Symbol"
          type="text"
          variant="standard"
          value={symbol.value}
          name="symbol"
          onChange={({ target: { value } }) => form.update({ symbol: value })}
        />
        <FrequenciesGrid
          frequencies={frequencies}
          add={form.frequencies.add}
          update={form.frequencies.update}
          remove={form.frequencies.remove}
          pitch={form.frequencies.pitch}
          pitching={pitching}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => popup.close()}>Cancel</Button>
        <Button onClick={() => created()}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUnitDialog;
