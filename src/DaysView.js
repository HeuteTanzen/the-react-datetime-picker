// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import getDay from 'date-fns/get_day'
import getDaysInMonth from 'date-fns/get_days_in_month'
import subMonths from 'date-fns/sub_months'
import format from 'date-fns/format'

import Page from './common/Page'
import Header from './common/Header'
import * as styles from './styles'
import type StructuredDate from './types'

type Props = {
  selectedDate?: StructuredDate,
  currentDate: StructuredDate,
  onSelect: (number) => mixed,
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

  createWeeks (firstDayOfWeek: number = 0) {
    const { selectedDate, currentDate } = this.props
    const { month, year } = currentDate
    const firstDayOfMonth = new Date(year, month, 1)
    const missingDays = getDay(firstDayOfMonth) - firstDayOfWeek
    const daysOfLastMonth = getDaysInMonth(subMonths(firstDayOfMonth, 1))
    const daysInThisMonth = getDaysInMonth(firstDayOfMonth)
    let daysToAddAfter = 42 - missingDays - daysInThisMonth
    let daysToAddBefore = missingDays
    if (daysToAddAfter > 7) {
      daysToAddBefore += 7
      daysToAddAfter -= 7
    }
    const selectedDay = selectedDate ? selectedDate.day : null
    const weeks = [
      [], [], [], [], [], []
    ]
    let m = 0
    // TODO: add selected for outside items
    if (daysToAddBefore > 0) {
      for (let i = daysToAddBefore; i--;) {
        if (weeks[m].length === 7) ++m
        weeks[m].push({ day: daysOfLastMonth - i, outside: true })
      }
    }
    for (let i = 1, l = daysInThisMonth; i <= l; ++i) {
      if (weeks[m].length === 7) ++m
      weeks[m].push({ day: i, selected: selectedDay === i, current: currentDate === i })
    }
    for (let i = 1; i <= daysToAddAfter; ++i) {
      if (weeks[m].length === 7) ++m
      weeks[m].push({ day: i, outside: true })
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
                  onClick={ () => onSelect(day.day) }
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

const Content = glamorous.div({
  boxSizing: 'border-box',
  border: '1px solid #999',
  display: 'table',
  flexDirection: 'column',
  overflow: 'hidden',
  width: '100%'
})

const Week = glamorous.div({
  display: 'table-row'
})

const Day = glamorous.div((props) => ({
  ...styles.pickerItem(props),
  color: props.outside ? '#999' : 'inherit',
  display: 'table-cell',
  lineHeight: '2em',
  width: `${100 / 7}%`
}))
