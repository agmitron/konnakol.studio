import { Selectable } from "~/shared/utils/types.utils";

interface INote extends Selectable {
  symbol: string;
  color?: string;
}

function Note({ color = "black", symbol }: INote) {
  return <span style={{ color }}>{symbol}</span>;
}

export default Note;
