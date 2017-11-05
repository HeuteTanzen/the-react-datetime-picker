// @flow
import React, { Component } from 'react'
import { render } from 'react-dom'
import { autobind } from 'core-decorators'
import addDays from 'date-fns/add_days'

import DateTimePicker from './src'

type Example1State = {
  value: Date
}

class Exmaple1 extends Component<*, Example1State> {
  state = {
    value: new Date(2017, 11, 24, 18, 0)
  }

  @autobind
  handleChange (value) {
    this.setState({ value })
  }

  render () {
    return (
      <div>
        <h1>Preselected Date</h1>
        <label htmlFor="example1">All inclusive:</label>
        <DateTimePicker
          id="example1"
          placeholder="DD.MM.YYYY HH:mm"
          resultFormat="DD.MM.YYYY HH:mm"
          selectedDate={ this.state.value }
          onChange={ this.handleChange }
          initialView="Days"
        />
        <div><strong>Choosen value:</strong> { this.state.value.toISOString() }</div>
      </div>
    )
  }
}
render(<Exmaple1 />, document.getElementById('example1'))

render(<div>
  <h1>No default date Date</h1>
  <label htmlFor="example2">Enter a date:</label>
  <DateTimePicker
    id="example2"
    placeholder="DD.MM.YYYY HH:mm"
    resultFormat="DD.MM.YYYY HH:mm"
    initialView="Days"
  />
</div>, document.getElementById('example2'))

const theme = {
  selectedItem: {
    backgroundColor: '#333',
    color: '#fff',
    ':hover': {
      backgroundColor: '#388'
    }
  },
  Overlay: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #999',
    borderRadius: '4px',
    fontFamily: 'Helvetica',
    width: '400px'
  },
  Header: {
    lineHeight: '1.8'
  }
}

render(<div>
  <h1>Theming example</h1>
  <label htmlFor="example3">Enter a date:</label>
  <DateTimePicker
    id="example3"
    placeholder="DD.MM.YYYY HH:mm"
    resultFormat="DD.MM.YYYY HH:mm"
    initialView="Days"
    selectedDate={ addDays(new Date(), 1) }
    theme={ theme }
  />
</div>, document.getElementById('example3'))
