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
import FrequenciesGrid from "~/pages/editor/dialogs/unit/shared/FrequenciesGrid";

import { form, popup, saved } from "../model";

function EditUnitDialog() {
  const isOpen = useStore(popup.$isOpen);
  const pitching = useStore(form.frequencies.$listening);
  const frequencies = useStore(form.frequencies.$store);
  const symbol = useStoreMap(form.$store, (f) => f.symbol);

  return (
    <>
      {
        <Dialog open={isOpen} onClose={() => close()} fullWidth>
          <DialogTitle>Edit Unit</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit an existing unit.</DialogContentText>
            <TextField
              fullWidth
              margin="dense"
              label="Symbol"
              type="text"
              variant="standard"
              value={symbol.value}
              name="symbol"
              onChange={({ target: { value } }) =>
                form.update({ symbol: value })
              }
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
            <Button onClick={() => saved()}>Save</Button>
          </DialogActions>
        </Dialog>
      }
    </>
  );
}

export default EditUnitDialog;
