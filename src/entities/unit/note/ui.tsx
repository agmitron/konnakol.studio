import { Selectable } from "~/utils/types.utils";

interface INoteComponentProps extends Selectable {
  symbol: string;
  color?: string;
}

function NoteComponent({ color = "black", symbol }: INoteComponentProps) {
  return <span style={{ color }}>{symbol}</span>;
}

export default NoteComponent;
