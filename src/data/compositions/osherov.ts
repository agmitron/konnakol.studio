import Composition from '~/entities/composition/model'
import Tact from '~/entities/composition/model/Tact'
import Chord from '~/entities/unit/chord/model'
import Note from '~/entities/unit/note/model'
import { DKurd } from '../instruments'

const pattern = [
  new Tact([
    new Note({ frequencies: [DKurd.notes[0].frequency], symbol: 'D' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [], symbol: '.' }),
    new Note({ frequencies: [DKurd.notes[8].frequency], symbol: '8', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[5].frequency], symbol: '5' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [], symbol: '.' }),
    new Note({ frequencies: [], symbol: 'B', color: 'green' }),
  ]),
  new Tact([
    new Note({ frequencies: [], symbol: '*' }),
    new Note({ frequencies: [DKurd.notes[1].frequency], symbol: '1', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[7].frequency], symbol: '7' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [], symbol: '.' }),
    new Chord([
      new Note({ frequencies: [DKurd.notes[6].frequency], symbol: '6', color: 'green' }),
      new Note({ frequencies: [DKurd.notes[4].frequency], symbol: '4', color: 'green' })
    ]),
    new Note({ frequencies: [], symbol: '.' }),
    new Note({ frequencies: [], symbol: 'B', color: 'green' }),
  ]),
  new Tact([
    new Note({ frequencies: [], symbol: '*' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[3].frequency], symbol: '3' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [], symbol: '.' }),
    new Note({ frequencies: [DKurd.notes[1].frequency], symbol: '1', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[4].frequency], symbol: '4' }),
    new Note({ frequencies: [], symbol: 'B', color: 'green' }),
  ]),
  new Tact([
    new Note({ frequencies: [], symbol: '*' }),
    new Note({ frequencies: [], symbol: '.', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[1].frequency], symbol: '1' }),
    new Note({ frequencies: [DKurd.notes[2].frequency], symbol: '2', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[3].frequency], symbol: '3' }),
    new Note({ frequencies: [DKurd.notes[4].frequency], symbol: '4', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[3].frequency], symbol: '3' }),
    new Note({ frequencies: [DKurd.notes[2].frequency], symbol: '2', color: 'green' }),
  ])
]

const Osherov1 = new Composition({
  id: 1,
  bpm: 160,
  name: 'Kirill Osherov Excercise #1',
  pattern,
  size: 8
})

export default Osherov1