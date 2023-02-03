import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MicIcon from "@mui/icons-material/Mic";
import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { Grid, TextField, InputAdornment, IconButton } from "@mui/material";

interface IFrequenciesGridProps {
  frequencies: Array<[string, { value: string; error: string }]>;
  pitching: string | null;
  update: (frequency: [string, string]) => void;
  remove: (name: string) => void;
  pitch: (name: string) => void;
  add: () => void;
}

const FrequenciesGrid: React.FC<IFrequenciesGridProps> = ({
  frequencies,
  pitching,
  update,
  remove,
  pitch,
  add,
}) => {
  return (
    <Grid container spacing={2} alignItems="center">
      {frequencies.map(([name, { value, error }], i) => (
        <Grid item xs={3.5} key={name}>
          <TextField
            margin="dense"
            label="Frequency"
            name={name}
            value={value}
            error={Boolean(error)}
            helperText={error}
            type="number"
            fullWidth
            variant="standard"
            onChange={({ target: { value } }) => update([name, value])}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {pitching === name ? (
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => pitch(name)}
                          edge="end"
                        >
                          <DoneIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          color="secondary"
                          onClick={() => pitch(name)}
                          edge="end"
                        >
                          <MicIcon />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => remove(name)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      ))}

      <Grid item xs={1}>
        <IconButton
          color="primary"
          onClick={() => add()}
        >
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default FrequenciesGrid;
