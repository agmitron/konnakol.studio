import { styled, TextField } from "@mui/material";
import { useStore } from "effector-react";
import Tact from "~/entities/unit/tact/ui";
import { $composition, $konnakol, konnakolChanged } from "../model";

const Root = styled("section")`
  grid-area: sheet;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  row-gap: 30px;
  padding-top: 20px;
  padding-right: 20px;
`;

const Textarea = styled(TextField)({
  "& .MuiInputBase-root": {
    fontFamily: "monospace",
    fontSize: 25,
    whiteSpace: "pre",
    overflowWrap: "normal",
    overflowX: "scroll",
  },
});

const Sheet = () => {
  const konnakol = useStore($konnakol);
  const composition = useStore($composition);

  return (
    <Root>
      <Textarea
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
    </Root>
  );
};

export default Sheet;
