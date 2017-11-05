// @flow
import React, { Component, type ElementRef } from 'react'
import { ThemeProvider } from 'glamorous'
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
import Overlay from './common/Overlay'
import DEFAULT_THEME from './themes/default'
import { parseDateString } from './utils/string'
import type { StructuredDate } from './types'

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm'

type PossibleView = 'Years' | 'Months' | 'Days' | 'Hours' | 'Minutes'

type Props = {
  theme?: Object,
  selectedDate?: Date,
  placeholder?: string,
  resultFormat?: string,
  initialView?: PossibleView
}

const VIEWS = ['Years', 'Months', 'Days', 'Hours', 'Minutes']

type State = {
  value: string,
  modalOpen: bool,
  openedView: PossibleView,
  currentDate: StructuredDate,
  selectedDate?: StructuredDate
}

export default class DateTimePicker extends Component<Props, State> {
  input: ElementRef<any>
  soonTimeout: number
  theme: Object

  constructor (props: Props) {
    super(props)
    let selectedDate
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
      value: this.formatResult(selectedDate),
      modalOpen: false,
      currentDate,
      selectedDate,
      openedView: props.initialView || 'Years'
    }
    this.theme = Object.keys(DEFAULT_THEME).reduce((memo, key) => ({
      ...memo,
      [key]: typeof DEFAULT_THEME[key] === 'object' ? {
        ...DEFAULT_THEME[key],
        ...(this.props.theme || {})[key]
      } : DEFAULT_THEME[key] || (this.props.theme || {})[key]
    }), {})
  }

  formatResult (selectedDate: ?StructuredDate) {
    const { year, month, day, hour, minute } = selectedDate || {}
    const date = new Date(year, month, day, hour, minute)
    if (!isValid(date)) return ''

    return format(date, this.outputFormat)
  }

  get outputFormat (): string {
    return this.props.resultFormat || DEFAULT_FORMAT
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

  @autobind
  focus () {
    if (this.input) this.input.focus()
  }

  @autobind
  selectYear (year: number) {
    const { currentDate } = this.state
    const selectedDate = {
      ...this.state.selectedDate,
      year
    }
    this.focus()
    this.setState({
      value: this.formatResult(selectedDate),
      selectedDate,
      currentDate: {
        ...currentDate,
        year
      },
      openedView: 'Months'
    })
  }

  @autobind
  selectMonth (month: number) {
    const { currentDate } = this.state
    const selectedDate = {
      ...this.state.selectedDate,
      year: currentDate.year,
      month
    }
    this.focus()
    this.setState({
      value: this.formatResult(selectedDate),
      selectedDate,
      currentDate: {
        ...currentDate,
        month
      },
      openedView: 'Days'
    })
  }

  @autobind
  selectDay (day: number, month?: number, year?: number) {
    const { currentDate } = this.state
    const newYear = typeof year === 'undefined' ? currentDate.year : year
    const newMonth = typeof month === 'undefined' ? currentDate.month : month
    const selectedDate = {
      ...this.state.selectedDate,
      year: newYear,
      month: newMonth,
      day
    }
    this.focus()
    this.setState({
      value: this.formatResult(selectedDate),
      selectedDate,
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
    const { currentDate } = this.state
    const selectedDate = {
      ...this.state.selectedDate,
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
      hour
    }
    this.focus()
    this.setState({
      value: this.formatResult(selectedDate),
      selectedDate,
      currentDate: {
        ...currentDate,
        hour
      },
      openedView: 'Minutes'
    })
  }

  @autobind
  selectMinute (minute: number) {
    const { currentDate } = this.state
    const selectedDate = {
      ...this.state.selectedDate,
      year: currentDate.year,
      month: currentDate.month,
      day: currentDate.day,
      hour: currentDate.hour,
      minute
    }
    this.focus()
    this.setState({
      value: this.formatResult(selectedDate),
      selectedDate,
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

  @autobind
  handleInputChange (event: Object) {
    const { value } = event.target
    const date = parseDateString(value, this.outputFormat)
    if (date) {
      const selectedDate = {
        year: getYear(date),
        month: getMonth(date),
        day: getDate(date),
        hour: getHours(date),
        minute: getMinutes(date)
      }
      this.setState({
        value,
        selectedDate,
        currentDate: selectedDate
      })
    } else {
      this.setState({ value })
    }
  }

  render () {
    const { value, modalOpen, openedView, selectedDate, currentDate } = this.state

    return (
      <ThemeProvider theme={ this.theme }>
        <span>
          <input
            type="text"
            autoComplete="off"
            ref={ ref => { this.input = ref } }
            placeholder={ this.props.placeholder }
            value={ value }
            onChange={ this.handleInputChange }
            onFocus={ this.open }
            onBlur={ this.closeSoon }
          />
          { modalOpen &&
            <Overlay>
              { openedView === 'Years' &&
                <YearsView
                  selectedDate={ selectedDate }
                  onBack={ this.focus }
                  onSelect={ this.selectYear }
                  onPrevDecade={ this.focus }
                  onNextDecade={ this.focus }
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
            </Overlay>
          }
        </span>
      </ThemeProvider>
    )
  }
}
