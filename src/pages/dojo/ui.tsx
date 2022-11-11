import React, { useEffect, useMemo } from "react";
import Tact from "~/entities/unit/tact/ui";
import IconPlay from "@mui/icons-material/PlayArrow";

import {
  enterBPMButtonClicked,
  isRepeatingToggled,
  pitcherUpdated,
  compositionStarted,
  $bpm,
  $composition,
  $isListening,
  $isPlaying,
  $isRepeating,
  compositionRequested,
  $compositionState,
  compositionStopped,
} from "~/features/dojo/model";

import { useStore } from "effector-react";
import { $failed, $success } from "~/features/dojo/score";
import { useParams } from "react-router-dom";
import { pitchers } from "~/shared/pitch/shared";
import { $frequency, $pitcher } from "~/shared/pitch";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";

const Root = styled("main")`
  display: grid;
  justify-items: center;
  row-gap: 25px;
  padding: 20px 50px 50px;
`;

const Composition = styled("section")`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  overflow: hidden;
  resize: horizontal;
  width: 100%;
`;

const Controls = styled("header")`
  display: flex;
  align-items: center;
  column-gap: 15px;
`;

const Score = styled(Typography)`
  color: ${(p: { color?: string }) => p.color ?? "black"};
  font-weight: bold;
`;

const Size = styled("div")`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
`;

const FractionIndex = styled("span")`
  color: lightgray;
  font-size: 20px;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
`;

const Pattern = styled("div")`
  display: grid;
  grid-auto-rows: 1fr;
`;

function Dojo() {
  const composition = useStore($composition);
  const pitcher = useStore($pitcher);
  const currentFrequency = useStore($frequency);
  const bpm = useStore($bpm);
  const isPlaying = useStore($isPlaying);
  const isListening = useStore($isListening);
  const isRepeating = useStore($isRepeating);
  const compositionState = useStore($compositionState);
  const successScore = useStore($success);
  const failedScore = useStore($failed);

  const pitchersKeys = useMemo(() => Object.keys(pitchers), []);
  const { compositionId } = useParams();

  const expectedFrequencies = useMemo(
    () => compositionState?.beat.frequencies ?? [],
    [compositionState]
  );

  useEffect(() => {
    if (compositionId) {
      compositionRequested(Number(compositionId));
    }
  }, [compositionId]);

  if (!composition) {
    return <h1>Loading...</h1>;
  }

  return (
    <Root>
      <Controls>
        <Typography variant="h5">{composition.name}</Typography>
        <Score color="green">Success: {successScore}</Score>
        <Score color="red">Failed: {failedScore}</Score>
        <p className="composition__frequency">
          Expected: {expectedFrequencies.join("|")} Hz
        </p>
        <Typography>Received: {currentFrequency.toFixed(2)} Hz</Typography>
        <Button
          startIcon={<IconPlay />}
          variant="contained"
          color={isPlaying ? "error" : "primary"}
          onClick={() =>
            !isPlaying ? compositionStarted() : compositionStopped()
          }
        >
          {isPlaying ? "Stop" : "Play"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => enterBPMButtonClicked()}
        >
          Enter BPM ({bpm})
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              checked={isRepeating}
              onChange={({ target: { checked } }) =>
                isRepeatingToggled(checked)
              }
            />
          }
          label="Repeat"
        />
        <Select
          size="small"
          value={pitcher.name}
          onChange={(e) => pitcherUpdated(e.target.value)}
        >
          {pitchersKeys.map((pitcher) => (
            <MenuItem key={pitcher} value={pitcher}>
              {pitcher}
            </MenuItem>
          ))}
        </Select>
      </Controls>
      {composition && (
        <Composition>
          <Size>
            {new Array(composition.size).fill(1).map((_, fractionIndex) => (
              <FractionIndex key={fractionIndex}>
                {fractionIndex + 1}
              </FractionIndex>
            ))}
          </Size>
          <Pattern>
            {composition.pattern.map(({ units }, index) => (
              <Tact
                key={index}
                isSelected={compositionState?.tact.index === index}
                selectedUnitIndex={compositionState?.beat.index}
                units={units}
              />
            ))}
          </Pattern>
        </Composition>
      )}
    </Root>
  );
}

export default Dojo;
