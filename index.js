import React from 'react'
import { render } from 'react-dom'

import DateTimePicker from './src'

render(<div>
  <label htmlFor="example1">All inclusive:</label>
  <DateTimePicker
    id="example1"
    placeholder="DD.MM.YYYY HH:mm"
    resultFormat="DD.MM.YYYY HH:mm"
  />
</div>, document.body)
