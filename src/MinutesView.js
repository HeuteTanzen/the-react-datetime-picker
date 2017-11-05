// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'
import getMinute from 'date-fns/get_minutes'
import getHour from 'date-fns/get_hours'
import getDate from 'date-fns/get_date'
import getMonth from 'date-fns/get_month'
import getYear from 'date-fns/get_year'

import { paddedStr } from './utils/string'
import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'
import type { StructuredDate } from './types'

type Props = {
  selectedDate?: StructuredDate,
  currentDate: StructuredDate,
  onSelect: (number) => mixed,
  onBack: () => mixed,
  onPrevHour: () => mixed,
  onNextHour: () => mixed
}

type State = {
  open: bool
}

export default class MinutesView extends Component<Props, State> {
  state = {
    open: false
  }

  render () {
    const { currentDate, selectedDate, onSelect, onBack, onPrevHour, onNextHour } = this.props
    const { year, month, day, hour } = currentDate
    const shownDate = new Date(year, month, day)
    const selectedMinute = selectedDate ? selectedDate.minute : null
    const paddedHour = paddedStr(hour)
    const now = new Date()
    const currentMinute = getMinute(now)
    const isCurrentHour = currentDate.day === getDate(now) &&
      currentDate.month === getMonth(now) &&
      currentDate.year === getYear(now) &&
      currentDate.hour === getHour(now)

    const minutes = []
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i)
    }

    return (
      <Page>
        <Header
          title={ format(shownDate, 'DD.MM.YYYY') }
          onClick={ onBack }
          onPrev={ onPrevHour }
          onNext={ onNextHour }
        />
        <Content>
          { minutes.map(minute => (
            <Minute
              key={ minute }
              current={ currentMinute - minute >= 0 && currentMinute - minute < 5 && isCurrentHour }
              selected={ minute === selectedMinute }
              onMouseDown={ () => onSelect(minute) }
            >
              { paddedHour }:{ paddedStr(minute) }
            </Minute>
          ))}
        </Content>
      </Page>
    )
  }
}

const Minute = glamorous.div((props) => ({
  width: '33.33%',
  ...styles.pickerItem(props)
}))
