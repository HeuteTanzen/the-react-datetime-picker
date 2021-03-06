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
import { structToDate, dateToStruct, isOutOfRange } from './utils/date'
import type { StructuredDate } from './types'

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm'

type PossibleView = 'Years' | 'Months' | 'Days' | 'Hours' | 'Minutes'

type Props = {
  theme?: Object,
  inputProps?: Object,
  selectedDate?: Date,
  onChange?: Function,
  placeholder?: string,
  resultFormat?: string,
  initialView?: PossibleView,
  // Minimum pickable date and time
  min?: Date,
  // Maximum pickable date and time
  max?: Date
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
  clickedInPicker: bool

  constructor (props: Props) {
    super(props)
    let selectedDate
    const selectedDateObj = props.selectedDate || new Date()

    if (props.selectedDate) {
      selectedDate = this.processInputDate(props.selectedDate)
    }
    const currentDate = dateToStruct(selectedDateObj)

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

  processInputDate (date: Date) {
    return {
      year: getYear(date),
      month: getMonth(date),
      day: getDate(date),
      hour: getHours(date),
      minute: getMinutes(date)
    }
  }

  componentDidMount () {
    this.input.addEventListener('focusout', this.handleFocusOut)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  componentDidUpdate (oldProps: Props) {
    if (
      this.props.selectedDate &&
      this.props.selectedDate !== oldProps.selectedDate &&
      this.props.selectedDate.getTime() !== (oldProps.selectedDate && oldProps.selectedDate.getTime())
    ) {
      const selectedDate = this.processInputDate(this.props.selectedDate)
      this.setState({
        value: this.formatResult(selectedDate),
        currentDate: selectedDate,
        selectedDate
      })
    }
  }

  @autobind
  handleFocusOut (event: Object) {
    if (this.clickedInPicker) {
      event.stopPropagation()
      event.preventDefault()
      event.currentTarget.focus()
    }
  }

  @autobind
  handleMouseDown () {
    this.clickedInPicker = true
  }

  @autobind
  handleMouseUp () {
    this.clickedInPicker = false
  }

  formatResult (selectedDate: ?StructuredDate) {
    const date = structToDate(selectedDate)
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
    this.soonTimeout = setTimeout(this.close, 10)
  }

  @autobind
  focus () {
    if (this.input) this.input.focus()
  }

  @autobind
  triggerChange (selectedDate?: StructuredDate) {
    const { onChange } = this.props

    onChange && onChange(structToDate(selectedDate))
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
    this.triggerChange(selectedDate)
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
    this.triggerChange(selectedDate)
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
    this.triggerChange(selectedDate)
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
    this.triggerChange(selectedDate)
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
    this.triggerChange(selectedDate)
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
    const year = currentDate
      ? (month === 0 ? currentDate.year + 1 : currentDate.year)
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
      this.triggerChange(selectedDate)
    } else {
      this.setState({ value })
    }
  }

  @autobind
  isOutOfRange (year: number, month?:number, day?: number, hour?: number, minute?:number): bool {
    const { min, max } = this.props

    return isOutOfRange(min, max, year, month, day, hour, minute)
  }

  render () {
    const { value, modalOpen, openedView, selectedDate, currentDate } = this.state

    return (
      <ThemeProvider theme={ this.theme }>
        <span onMouseDown={ this.handleMouseDown}>
          <input
            type="text"
            autoComplete="off"
            placeholder={ this.props.placeholder }
            { ...this.props.inputProps }
            ref={ ref => { this.input = ref } }
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
                  isOutOfRange={ this.isOutOfRange }
                /> }
              { openedView === 'Months' &&
                <MonthsView
                  selectedDate={ selectedDate }
                  onBack={ this.goBack }
                  onSelect={ this.selectMonth }
                  currentDate={ currentDate }
                  onPrevYear={ this.goToPrevYear }
                  onNextYear={ this.goToNextYear }
                  isOutOfRange={ this.isOutOfRange }
                /> }
              { openedView === 'Days' &&
                <DaysView
                  selectedDate={ selectedDate }
                  onBack={ this.goBack }
                  onSelect={ this.selectDay }
                  currentDate={ currentDate }
                  onPrevMonth={ this.goToPrevMonth }
                  onNextMonth={ this.goToNextMonth }
                  isOutOfRange={ this.isOutOfRange }
                /> }
              { openedView === 'Hours' &&
                <HoursView
                  selectedDate={ selectedDate }
                  onBack={ this.goBack }
                  onSelect={ this.selectHour }
                  currentDate={ currentDate }
                  onPrevDay={ this.goToPrevDay }
                  onNextDay={ this.goToNextDay }
                  isOutOfRange={ this.isOutOfRange }
                /> }
              { openedView === 'Minutes' &&
                <MinutesView
                  selectedDate={ selectedDate }
                  onBack={ this.goBack }
                  onSelect={ this.selectMinute }
                  currentDate={ currentDate }
                  onPrevHour={ this.goToPrevHour }
                  onNextHour={ this.goToNextHour }
                  isOutOfRange={ this.isOutOfRange }
                /> }
            </Overlay>
          }
        </span>
      </ThemeProvider>
    )
  }
}
