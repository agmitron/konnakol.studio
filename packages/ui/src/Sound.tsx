import React from 'react'
import { styled } from '@mui/material';
import { Selectable } from "utils/types";

interface ISound extends Selectable {
  symbol: string;
  color?: string;
}

const Root = styled('span')

function Sound({ color = "black", symbol }: ISound) {
  return <Root style={{ color }}>{symbol}</Root>;
}

export default Sound;
