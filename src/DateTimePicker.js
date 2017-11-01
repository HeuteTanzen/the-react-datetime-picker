// @flow
import React, { Component, type ElementRef } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import getHours from 'date-fns/get_hours'
import isValid from 'date-fns/is_valid'
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

type PossibleView = 'Years' | 'Months' | 'Days' | 'Hours' | 'Minutes'

type Props = {
  selectedDate?: Date,
  placeholder?: string,
  resultFormat?: string,
  initialView?: PossibleView
}

const VIEWS = ['Years', 'Months', 'Days', 'Hours', 'Minutes']

type State = {
  modalOpen: bool,
  openedView: PossibleView,
  currentDate: StructuredDate,
  selectedDate?: StructuredDate
}

export default class DateTimePicker extends Component<Props, State> {
  input: ElementRef<any>
  soonTimeout: number

  constructor (props: Props) {
    super(props)
    let selectedDate = null
    const selectedDateObj = props.selectedDate || new Date()

    if (props.selectedDate) {
      selectedDate = {
        year: getYear(selectedDateObj),
        month: getMonth(selectedDateObj),
        day: getDate(selectedDateObj),
        hour: getHours(selectedDateObj),
        minute: getMinutes(selectedDateObj)
      }
    }
    const currentDate = {
      year: getYear(selectedDateObj),
      month: getMonth(selectedDateObj),
      day: getDate(selectedDateObj),
      hour: getHours(selectedDateObj),
      minute: getMinutes(selectedDateObj)
    }

    this.state = {
      modalOpen: false,
      currentDate,
      selectedDate,
      openedView: props.initialView || 'Years'
    }
  }

  formatResult () {
    const { year, month, day, hour, minute } = this.state.selectedDate || {}
    const date = new Date(year, month, day, hour, minute)
    if (!isValid(date)) return ''

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
    const { selectedDate, currentDate } = this.state
    this.focus()
    this.setState({
      selectedDate: {
        ...selectedDate,
        year
      },
      currentDate: {
        ...currentDate,
        year
      },
      openedView: 'Months'
    })
  }

  @autobind
  selectMonth (month: number) {
    const { selectedDate, currentDate } = this.state
    this.focus()
    this.setState({
      selectedDate: {
        ...selectedDate,
        year: currentDate.year,
        month
      },
      currentDate: {
        ...currentDate,
        month
      },
      openedView: 'Days'
    })
  }

  @autobind
  selectDay (day: number, month?: number, year?: number) {
    const { selectedDate, currentDate } = this.state
    this.focus()
    const newYear = typeof year === 'undefined' ? currentDate.year : year
    const newMonth = typeof month === 'undefined' ? currentDate.month : month
    this.setState({
      selectedDate: {
        ...selectedDate,
        year: newYear,
        month: newMonth,
        day
      },
      currentDate: {
        ...currentDate,
        year: newYear,
        month: newMonth,
        day
      },
      openedView: 'Hours'
    })
  }

  @autobind
  selectHour (hour: number) {
    const { selectedDate, currentDate } = this.state
    this.focus()
    this.setState({
      selectedDate: {
        ...selectedDate,
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day,
        hour
      },
      currentDate: {
        ...currentDate,
        hour
      },
      openedView: 'Minutes'
    })
  }

  @autobind
  selectMinute (minute: number) {
    const { selectedDate, currentDate } = this.state
    this.focus()
    this.setState({
      selectedDate: {
        ...selectedDate,
        year: currentDate.year,
        month: currentDate.month,
        day: currentDate.day,
        hour: currentDate.hour,
        minute
      },
      currentDate: {
        ...currentDate,
        minute
      }
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
    const { selectedDate, currentDate } = this.state
    const month = (currentDate.month + 1) % 12
    const year = selectedDate
      ? (month === 0 ? selectedDate.year + 1 : selectedDate.year)
      : currentDate.year
    this.setState({
      currentDate: {
        ...currentDate,
        year,
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
    const { modalOpen, openedView, selectedDate, currentDate } = this.state

    return (
      <span>
        <input
          type="text"
          ref={ ref => { this.input = ref } }
          placeholder={ this.props.placeholder }
          value={ this.formatResult() }
          onFocus={ this.open }
          onBlur={ this.closeSoon }
        />
        { modalOpen &&
          <Page>
            { openedView === 'Years' &&
              <YearsView
                selectedDate={ selectedDate }
                onSelect={ this.selectYear }
                currentDate={ currentDate }
              /> }
            { openedView === 'Months' &&
              <MonthsView
                selectedDate={ selectedDate }
                onBack={ this.goBack }
                onSelect={ this.selectMonth }
                currentDate={ currentDate }
                onPrevYear={ this.goToPrevYear }
                onNextYear={ this.goToNextYear }
              /> }
            { openedView === 'Days' &&
              <DaysView
                selectedDate={ selectedDate }
                onBack={ this.goBack }
                onSelect={ this.selectDay }
                currentDate={ currentDate }
                onPrevMonth={ this.goToPrevMonth }
                onNextMonth={ this.goToNextMonth }
              /> }
            { openedView === 'Hours' &&
              <HoursView
                selectedDate={ selectedDate }
                onBack={ this.goBack }
                onSelect={ this.selectHour }
                currentDate={ currentDate }
                onPrevDay={ this.goToPrevDay }
                onNextDay={ this.goToNextDay }
              /> }
            { openedView === 'Minutes' &&
              <MinutesView
                selectedDate={ selectedDate }
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
