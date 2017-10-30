// @flow
import React, { Component, type ElementRef } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import getHours from 'date-fns/get_hours'
import getMinutes from 'date-fns/get_minutes'
import subDays from 'date-fns/sub_days'
import addDays from 'date-fns/add_days'
import subHours from 'date-fns/sub_hours'
import addHours from 'date-fns/add_hours'
import { autobind } from 'core-decorators'

import YearsView from './YearsView'
import MonthsView from './MonthsView'
import DaysView from './DaysView'
import HoursView from './HoursView'
import MinutesView from './MinutesView'
import type StructuredDate from './types'

type Props = {
  selectedDate?: Date,
  placeholder?: string,
  resultFormat?: string
}

const VIEWS = ['Years', 'Months', 'Days', 'Hours', 'Minutes']

type PossibleView = 'Years' | 'Months' | 'Days' | 'Hours' | 'Minutes'

type State = {
  modalOpen: bool,
  openedView: PossibleView,
  currentDate: StructuredDate,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number
}

export default class DateTimePicker extends Component<Props, State> {
  input: ElementRef<any>
  soonTimeout: number

  constructor (props: Props) {
    super(props)
    const { selectedDate = new Date() } = props

    const currentDate = {
      year: getYear(selectedDate),
      month: getMonth(selectedDate),
      day: getDate(selectedDate),
      hour: getHours(selectedDate),
      minute: getMinutes(selectedDate)
    }
    this.state = {
      modalOpen: false,
      currentDate,
      openedView: 'Days',
      ...currentDate
    }
  }

  formatResult () {
    const { year, month, day, hour, minute } = this.state
    const date = new Date(year, month, day, hour, minute)
    return this.props.resultFormat
      ? format(date, this.props.resultFormat)
      : date.toISOString()
  }

  @autobind
  open () {
    this.setState({ modalOpen: true })
    this.soonTimeout && clearTimeout(this.soonTimeout)
  }

  @autobind
  close () {
    this.setState({ modalOpen: false })
  }

  @autobind
  closeSoon () {
    this.soonTimeout = setTimeout(this.close, 330)
  }

  focus () {
    if (this.input) this.input.focus()
  }

  @autobind
  selectYear (year: number) {
    this.focus()
    this.setState({
      year,
      openedView: 'Months'
    })
  }

  @autobind
  selectMonth (month: number) {
    const { currentDate } = this.state
    this.focus()
    this.setState({
      year: currentDate.year,
      month,
      openedView: 'Days'
    })
  }

  @autobind
  selectDay (day: number) {
    const { currentDate } = this.state
    this.focus()
    this.setState({
      year: currentDate.year,
      month: currentDate.month,
      day,
      openedView: 'Hours'
    })
  }

  @autobind
  selectHour (hour: number) {
    const { currentDate } = this.state
    this.focus()
    this.setState({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
      hour,
      openedView: 'Minutes'
    })
  }

  @autobind
  selectMinute (minute: number) {
    const { currentDate } = this.state
    this.focus()
    this.setState({
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
      hour: currentDate.hour,
      minute
    })
  }

  @autobind
  goToPrevMonth () {
    this.focus()
    const { currentDate } = this.state
    const month = currentDate.month > 0 ? currentDate.month - 1 : 11
    this.setState({
      currentDate: {
        ...currentDate,
        year: month === 11 ? currentDate.year - 1 : currentDate.year,
        month
      }
    })
  }

  @autobind
  goToNextMonth () {
    this.focus()
    const { currentDate } = this.state
    const month = (currentDate.month + 1) % 12
    this.setState({
      currentDate: {
        ...currentDate,
        year: month === 0 ? this.state.year + 1 : this.state.year,
        month
      }
    })
  }

  @autobind
  goToPrevYear () {
    this.focus()
    const { currentDate } = this.state
    this.setState({
      currentDate: {
        ...currentDate,
        year: currentDate.year - 1
      }
    })
  }

  @autobind
  goToNextYear () {
    this.focus()
    const { currentDate } = this.state
    this.setState({
      currentDate: {
        ...currentDate,
        year: currentDate.year + 1
      }
    })
  }

  @autobind
  goToPrevDay () {
    this.focus()
    const { currentDate } = this.state
    const newDay = subDays(new Date(currentDate.year, currentDate.month, currentDate.day), 1)
    this.setState({
      currentDate: {
        ...currentDate,
        year: getYear(newDay),
        month: getMonth(newDay),
        day: getDate(newDay)
      }
    })
  }

  @autobind
  goToNextDay () {
    this.focus()
    const { currentDate } = this.state
    const newDay = addDays(new Date(currentDate.year, currentDate.month, currentDate.day), 1)
    this.setState({
      currentDate: {
        ...currentDate,
        year: getYear(newDay),
        month: getMonth(newDay),
        day: getDate(newDay)
      }
    })
  }

  @autobind
  goToPrevHour () {
    this.focus()
    const { currentDate } = this.state
    const newHour = subHours(new Date(currentDate.year, currentDate.month, currentDate.day, currentDate.hour), 1)
    this.setState({
      currentDate: {
        ...currentDate,
        year: getYear(newHour),
        month: getMonth(newHour),
        day: getDate(newHour),
        hour: getHours(newHour)
      }
    })
  }

  @autobind
  goToNextHour () {
    this.focus()
    const { currentDate } = this.state
    const newHour = addHours(new Date(currentDate.year, currentDate.month, currentDate.day, currentDate.hour), 1)
    this.setState({
      currentDate: {
        ...currentDate,
        year: getYear(newHour),
        month: getMonth(newHour),
        day: getDate(newHour),
        hour: getHours(newHour)
      }
    })
  }

  @autobind
  goBack () {
    this.focus()
    this.setState({
      openedView: VIEWS[VIEWS.indexOf(this.state.openedView) - 1]
    })
  }

  render () {
    const { modalOpen, openedView, year, month, day, hour, minute, currentDate } = this.state
    console.log(this.state, this.formatResult(), 3)
    const selectedDate = new Date(year, month, day, hour, minute)

    return (
      <span>
        <input
          type="text"
          ref={ ref => { this.input = ref } }
          placeholder={ this.props.placeholder }
          value={ format(selectedDate, this.props.resultFormat) }
          onFocus={ this.open }
          onBlur={ this.closeSoon }
        />
        { modalOpen &&
          <Page>
            { openedView === 'Years' &&
              <YearsView
                selectedYear={ this.state.year }
                onSelect={ this.selectYear }
              /> }
            { openedView === 'Months' &&
              <MonthsView
                selectedYear={ this.state.year }
                selectedMonth={ this.state.month }
                onBack={ this.goBack }
                onSelect={ this.selectMonth }
                currentDate={ currentDate }
                onPrevYear={ this.goToPrevYear }
                onNextYear={ this.goToNextYear }
              /> }
            { openedView === 'Days' &&
              <DaysView
                selectedYear={ this.state.year }
                selectedMonth={ this.state.month }
                selectedDay={ this.state.day }
                onBack={ this.goBack }
                onSelect={ this.selectDay }
                currentDate={ currentDate }
                onPrevMonth={ this.goToPrevMonth }
                onNextMonth={ this.goToNextMonth }
              /> }
            { openedView === 'Hours' &&
              <HoursView
                selectedYear={ this.state.year }
                selectedMonth={ this.state.month }
                selectedDay={ this.state.day }
                selectedHour={ this.state.hour }
                onBack={ this.goBack }
                onSelect={ this.selectHour }
                currentDate={ currentDate }
                onPrevDay={ this.goToPrevDay }
                onNextDay={ this.goToNextDay }
              /> }
            { openedView === 'Minutes' &&
              <MinutesView
                selectedYear={ this.state.year }
                selectedMonth={ this.state.month }
                selectedDay={ this.state.day }
                selectedHour={ this.state.hour }
                selectedMinute={ this.state.minute }
                onBack={ this.goBack }
                onSelect={ this.selectMinute }
                currentDate={ currentDate }
                onPrevHour={ this.goToPrevHour }
                onNextHour={ this.goToNextHour }
              /> }
          </Page>
        }
      </span>
    )
  }
}

const Page = glamorous.div({
  border: '1px solid #999',
  width: '300px'
})
