import { Selectable } from "~/shared/utils/types";

interface ISound extends Selectable {
  symbol: string;
  color?: string;
}

function Sound({ color = "black", symbol }: ISound) {
  return <span style={{ color }}>{symbol}</span>;
}

export default Sound;
