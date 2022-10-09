import Composition from '~/entities/composition/model'
import Tact from '~/entities/composition/model/Tact'
import Chord from '~/entities/unit/model/Chord'
import Note from '~/entities/unit/model/Note'
import Roll from '~/entities/unit/model/Roll'
import { DKurd } from '../instruments'

const pattern = [
  new Tact([
    new Note({ frequencies: [], symbol: '*' }),
    new Note({ frequencies: [], symbol: '•', color: 'green' }),
    new Roll([
      new Note({ frequencies: [DKurd.notes[1].frequency], symbol: '1', }),
      new Note({ frequencies: [DKurd.notes[3].frequency], symbol: '2', color: 'green' }),
    ]),
    new Note({ frequencies: [DKurd.notes[2].frequency], symbol: '2', color: 'green' }),
    new Roll([
      new Note({ frequencies: [DKurd.notes[5].frequency], symbol: '5', }),
      new Note({ frequencies: [DKurd.notes[7].frequency], symbol: '7', color: 'green' }),
    ]),
    new Note({ frequencies: [DKurd.notes[4].frequency], symbol: '4', color: 'green' }),
    new Note({ frequencies: [DKurd.notes[3].frequency], symbol: '3' }),
    new Chord([
      new Note({ frequencies: [DKurd.notes[6].frequency], symbol: '6', color: 'green' }),
      new Note({ frequencies: [DKurd.notes[4].frequency], symbol: '4', color: 'green' })
    ]),
  ])
]

const RollChordTest = new Composition({
  id: 2,
  bpm: 60,
  name: 'Rolls & Chords (Test)',
  pattern,
  size: 8
})

export default RollChordTest