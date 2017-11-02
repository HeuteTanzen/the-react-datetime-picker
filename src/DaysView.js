// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDay from 'date-fns/get_day'
import getDate from 'date-fns/get_date'
import getDaysInMonth from 'date-fns/get_days_in_month'
import addMonths from 'date-fns/add_months'
import subMonths from 'date-fns/sub_months'
import format from 'date-fns/format'

import Page from './common/Page'
import Header from './common/Header'
import * as styles from './styles'
import type StructuredDate from './types'

type Props = {
  selectedDate?: StructuredDate,
  currentDate: StructuredDate,
  onSelect: (number, number, number) => mixed,
  onBack: () => mixed,
  onPrevMonth: () => mixed,
  onNextMonth: () => mixed
}

type State = {
  open: bool
}

export default class DaysView extends Component<Props, State> {
  state = {
    open: false
  }

  // @TODO: create tests and refactor this afterwords to make it more concise
  createWeeks (firstDayOfWeek: number = 0) {
    const { selectedDate, currentDate } = this.props
    const { month, year } = currentDate
    const firstDayOfMonth = new Date(year, month, 1)
    const missingDays = getDay(firstDayOfMonth) - firstDayOfWeek
    const lastMonth = subMonths(firstDayOfMonth, 1)
    const nextMonth = addMonths(firstDayOfMonth, 1)
    const daysOfLastMonth = getDaysInMonth(lastMonth)
    const daysInThisMonth = getDaysInMonth(firstDayOfMonth)
    let daysToAddAfter = 42 - missingDays - daysInThisMonth
    let daysToAddBefore = missingDays
    if (daysToAddAfter > 7) {
      daysToAddBefore += 7
      daysToAddAfter -= 7
    }
    const now = new Date()
    const today = getDate(now)
    const thisMonth = getMonth(now)
    const thisYear = getYear(now)
    const weeks = [
      [], [], [], [], [], []
    ]
    let m = 0
    if (daysToAddBefore > 0) {
      const month = getMonth(lastMonth)
      const year = getYear(lastMonth)
      for (let i = daysToAddBefore; i--;) {
        if (weeks[m].length === 7) ++m
        const day = daysOfLastMonth - i
        const selected = selectedDate && selectedDate.month === month && selectedDate.year === year && selectedDate.day === day
        const current = thisMonth === month && thisYear === year && today === day
        weeks[m].push({ day, month, year, selected, current, outside: true })
      }
    }
    if (daysInThisMonth > 0) {
      const month = getMonth(firstDayOfMonth)
      const year = getYear(firstDayOfMonth)
      for (let day = 1, l = daysInThisMonth; day <= l; ++day) {
        if (weeks[m].length === 7) ++m
        const selected = selectedDate && selectedDate.month === month && selectedDate.year === year && selectedDate.day === day
        const current = thisMonth === month && thisYear === year && today === day
        weeks[m].push({ day, month, year, selected, current })
      }
    }
    if (daysToAddAfter > 0) {
      const month = getMonth(nextMonth)
      const year = getYear(nextMonth)
      for (let day = 1; day <= daysToAddAfter; ++day) {
        if (weeks[m].length === 7) ++m
        const selected = selectedDate && selectedDate.month === month && selectedDate.year === year && selectedDate.day === day
        const current = thisMonth === month && thisYear === year && today === day
        weeks[m].push({ day, month, year, selected, current, outside: true })
      }
    }
    return weeks
  }

  render () {
    const { currentDate, onSelect, onBack, onPrevMonth, onNextMonth } = this.props
    const { month, year } = currentDate
    const shownDate = new Date(year, month, 1)

    const weeks = this.createWeeks()

    return (
      <Page>
        <Header
          title={ format(shownDate, 'MMM YYYY') }
          onClick={ onBack }
          onPrev={ onPrevMonth }
          onNext={ onNextMonth }
        />
        <Content>
          { weeks.map((days, index) => (
            <Week key={ index }>
              { days.map(day => (
                <Day
                  key={ day.day }
                  { ...day }
                  onClick={ () => onSelect(day.day, day.month, day.year) }
                >
                  { day.day }
                </Day>
              ))}
            </Week>
          ))}
        </Content>
      </Page>
    )
  }
}

const Content = glamorous.div(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'table',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%',
  ...theme.Body
}))

const Week = glamorous.div({
  display: 'table-row'
})

const Day = glamorous.div((props) => ({
  display: 'table-cell',
  width: `${100 / 7}%`,
  ...styles.pickerItem(props)
}))
