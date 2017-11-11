// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'
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
  onPrevDay: () => mixed,
  onNextDay: () => mixed,
  isOutOfRange: (number, number, number, number) => bool
}

// TODO: remove state stuff from all views
type State = {
  open: bool
}

export default class HoursView extends Component<Props, State> {
  state = {
    open: false
  }

  render () {
    const { currentDate, selectedDate, onSelect, onBack, onPrevDay, onNextDay, isOutOfRange } = this.props
    const { year, month, day } = currentDate
    const shownDate = new Date(year, month, day)
    const selectedHour = selectedDate ? selectedDate.hour : null
    const now = new Date()
    const currentHour = getHour(now)
    const isCurrentDay = currentDate.day === getDate(now) &&
      currentDate.month === getMonth(now) &&
      currentDate.year === getYear(now)

    const hours = []
    for (let i = 0; i < 24; ++i) {
      hours.push(i)
    }

    return (
      <Page>
        <Header
          title={ format(shownDate, 'DD.MM.YYYY') }
          onClick={ onBack }
          onPrev={ onPrevDay }
          onNext={ onNextDay }
        />
        <Content>
          { hours.map(hour => (
            <Hour
              key={ hour }
              current={ hour === currentHour && isCurrentDay }
              selected={ hour === selectedHour }
              outOfRange={ isOutOfRange(currentDate.year, currentDate.month, currentDate.day, hour) }
              onMouseDown={ () => onSelect(hour) }
            >
              { paddedStr(hour) }:00
            </Hour>
          ))}
        </Content>
      </Page>
    )
  }
}

const Hour = glamorous.div((props) => ({
  display: 'block',
  width: '25%',
  ...styles.pickerItem(props)
}))
