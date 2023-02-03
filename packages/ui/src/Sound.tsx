import React from 'react'
import { Selectable } from "utils/types";

interface ISound extends Selectable {
  symbol: string;
  color?: string;
}

function Sound({ color = "black", symbol }: ISound) {
  return <span style={{ color }}>{symbol}</span>;
}

export default Sound;
