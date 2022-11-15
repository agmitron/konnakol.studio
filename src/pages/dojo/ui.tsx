import { useEffect, useMemo } from "react";
import { combine } from "effector";
import { useStore } from "effector-react";
import { useParams } from "react-router-dom";
import PlayIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import TimerIcon from "@mui/icons-material/Timer";
import ShareIcon from "@mui/icons-material/Share";
import LoopIcon from "@mui/icons-material/Loop";
import LoopIconOutlined from "@mui/icons-material/Loop";
import Tact from "~/entities/unit/tact/ui";
import Header from "~/widgets/header/ui";

import {
  loopButtonClicked,
  $bpm,
  $composition,
  $isPlaying,
  $isLooping,
  compositionRequested,
  $compositionState,
  playButtonClicked,
} from "~/features/dojo/model";

import { $failed, $success } from "~/features/dojo/score";
import { pitchers } from "~/shared/pitch/shared";
import { $frequency, $pitcher } from "~/shared/pitch";
import {
  Grid,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  styled,
  Typography,
} from "@mui/material";

const $actions = combine($isPlaying, $isLooping, (isPlaying, isLooping) => {
  return Object.values({
    play: {
      icon: isPlaying ? <StopIcon /> : <PlayIcon />,
      name: isPlaying ? "Stop" : "Play",
      onClick: () => playButtonClicked(),
      color: "primary",
    },
    setBPM: { icon: <TimerIcon />, name: "BPM", onClick: () => {} },
    share: { icon: <ShareIcon />, name: "Share", onClick: () => {} },
    loop: {
      icon: isLooping ? <LoopIconOutlined /> : <LoopIcon />,
      name: "Loop",
      onClick: () => loopButtonClicked(),
    },
  });
});

const Root = styled("main")`
  display: grid;
  justify-items: center;
  row-gap: 25px;
  padding: 25px;
`;

const Composition = styled("section")`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  overflow: hidden;
  resize: horizontal;
  width: 100%;
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
  const isLooping = useStore($isLooping);
  const compositionState = useStore($compositionState);
  const successScore = useStore($success);
  const failedScore = useStore($failed);
  const actions = useStore($actions);

  const pitchersKeys = useMemo(() => Object.keys(pitchers), []);
  const { compositionId } = useParams();

  const expectedFrequencies = useMemo(
    () => compositionState?.beat.value.frequencies ?? ["0.00"],
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
    <>
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

          {/* <Grid item>
            <Controls>
              <Select
                size="small"
                value={pitcher.name}
                onChange={(e) => pitcherUpdated(e.target.value)}
              >
                {pitchersKeys.map((pitcher) => (
                  <MenuItem key={pitcher} value={pitcher}>
                    <Typography variant="body1" color="white">
                      {pitcher}
                    </Typography>
                  </MenuItem>
                ))}
              </Select>
            </Controls>
          </Grid> */}
        </Grid>
      </Header>
      <Root>
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
            />
          ))}
        </SpeedDial>
      </Root>
    </>
  );
}

export default Dojo;
