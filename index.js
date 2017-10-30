import React from 'react'
import { render } from 'react-dom'

import DateTimePicker from './src'

render(<div>
  <h1>Preselected Date</h1>
  <label htmlFor="example1">All inclusive:</label>
  <DateTimePicker
    id="example1"
    placeholder="DD.MM.YYYY HH:mm"
    resultFormat="DD.MM.YYYY HH:mm"
    selectedDate={ new Date(2017, 11, 24, 18, 0) }
  />
</div>, document.getElementById('example1'))

render(<div>
  <h1>No default date Date</h1>
  <label htmlFor="example1">Enter a date:</label>
  <DateTimePicker
    id="example2"
    placeholder="DD.MM.YYYY HH:mm"
    resultFormat="DD.MM.YYYY HH:mm"
  />
</div>, document.getElementById('example2'))
