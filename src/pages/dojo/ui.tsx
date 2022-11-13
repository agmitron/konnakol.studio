import React, { useEffect, useMemo, useState } from "react";
import { useStore } from "effector-react";
import { useParams } from "react-router-dom";
import PlayIcon from "@mui/icons-material/PlayArrow";
import PlayIconOutlined from "@mui/icons-material/PlayArrowOutlined";
import TimerIcon from "@mui/icons-material/Timer";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import LoopIconOutlined from "@mui/icons-material/LoopOutlined";
import Tact from "~/entities/unit/tact/ui";

import {
  enterBPMButtonClicked,
  isRepeatingToggled,
  pitcherUpdated,
  compositionStarted,
  $bpm,
  $composition,
  $isPlaying,
  $isRepeating,
  compositionRequested,
  $compositionState,
  compositionStopped,
  playButtonClicked,
} from "~/features/dojo/model";

import { $failed, $success } from "~/features/dojo/score";
import { pitchers } from "~/shared/pitch/shared";
import { $frequency, $pitcher } from "~/shared/pitch";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
  Typography,
} from "@mui/material";
import Header from "~/widgets/header/ui";

const actions = [
  {
    icon: <PlayIcon />,
    name: "Play",
    onClick: playButtonClicked,
    color: "primary",
  },
  { icon: <TimerIcon />, name: "BPM", onClick: () => {} },
  { icon: <ShareIcon />, name: "Share", onClick: () => {} },
  {
    icon: <LoopIcon />,
    name: "Loop",
    onClick: enterBPMButtonClicked,
  },
];

const Root = styled("main")`
  display: grid;
  justify-items: center;
  row-gap: 25px;
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
      <Header title="Dojo">
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Typography variant="body1" color="white">
              {composition.name}
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">Success: {successScore}</Typography>
            <Typography variant="body2">Failed: {failedScore}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">
              Expected: {expectedFrequencies.join("|")} Hz
            </Typography>
            <Typography variant="body2">
              Received: {currentFrequency.toFixed(2)} Hz
            </Typography>
          </Grid>
        </Grid>
      </Header>
      <Controls>
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
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            color="green"
          />
        ))}
      </SpeedDial>
    </Root>
  );
}

export default Dojo;
