import { styled, TextField } from "@mui/material";
import { useStore } from "effector-react";
import { Tact } from "ui";
import { $composition, $konnakol, konnakolChanged } from "../model";

const Root = styled("section")`
  grid-area: sheet;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  row-gap: 30px;
  padding-top: 20px;
  padding-right: 20px;
  height: 100%;
`;

const Textarea = styled(TextField)({
  "& .MuiInputBase-root": {
    fontFamily: '"Inconsolata", monospace',
    fontSize: 25,
    whiteSpace: "pre",
    overflowWrap: "normal",
    overflowX: "scroll",
  },
});

const Result = styled('div')`
  overflow-x: auto;
`

const Sheet = () => {
  const konnakol = useStore($konnakol);
  const composition = useStore($composition);

  return (
    <Root>
      <Result>
        {composition.map((tact, i) => (
          <Tact key={i} units={tact.units} />
        ))}
      </Result>
      <Textarea
        multiline
        fullWidth
        value={konnakol}
        onChange={({ target: { value } }) => konnakolChanged(value)}
        minRows={5}
        variant="filled"
        placeholder="Your konnakol here..."
      />
    </Root>
  );
};

export default Sheet;
