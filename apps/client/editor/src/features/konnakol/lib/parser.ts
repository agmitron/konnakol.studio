import { Pattern, Tact, Chord, Sound, isSound, Roll, Unit, ShorcutsToUnits } from 'entities';

const isChordSymbol = (symbol: string) => /^\((\S+\|?)+\)$/.test(symbol)
const isRollSymbol = (symbol: string) => /^\[\S+,?\]$/.test(symbol)

const getChordSounds = (chordSymbol: string) => chordSymbol.replaceAll(/\(|\)/g, '').split('|')
const getRollUnits = (rollSymbol: string) => rollSymbol.replaceAll(/\[|\]/g, '').split(',')

export default function parseKonnakol(
  unitsShortcutsMapping: ShorcutsToUnits,
  konnakol: string
): Pattern {
  if (!konnakol) {
    return [];
  }

  const parseSound = (symbol: string) => {
    const unit = unitsShortcutsMapping[symbol];

    if (unit && isSound(unit)) {
      return unit;
    }

    return new Sound({ frequencies: [], symbol, color: 'grey' })
  }

  const parseUnit = (symbol: string): Unit => {
    if (isChordSymbol(symbol)) {
      const notesSymbols = getChordSounds(symbol)
      return new Chord(notesSymbols.map(parseSound))
    }

    if (isRollSymbol(symbol)) {
      const unitsSymbols = getRollUnits(symbol);
      return new Roll(unitsSymbols.map(s => {
        if (isChordSymbol(s)) {
          return new Chord(getChordSounds(s).map(parseSound))
        }

        return parseSound(s)
      }))
    }

    return parseSound(symbol)
  }

  return konnakol
    .split('\n')
    .map(line => new Tact(
      line
        .trim()
        .split(' ')
        .map(parseUnit)
    ))
}