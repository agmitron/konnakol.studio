import { TextField } from "@mui/material";
import { useStore } from "effector-react";
import Tact from "~/entities/composition/tact/ui";
import { $composition, $konnakol, konnakolChanged } from '../model';

const Sheet = () => {
  const konnakol = useStore($konnakol);
  const composition = useStore($composition);

  return (
    <section className="sheet">
      <TextField
        multiline
        fullWidth
        value={konnakol}
        onChange={({ target: { value } }) => konnakolChanged(value)}
        minRows={5}
        placeholder="Your konnakol here..."
      />
      <div>
        {composition.map((tact, i) => (
          <Tact key={i} units={tact.units} />
        ))}
      </div>
    </section>
  );
};

export default Sheet;
