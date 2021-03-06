// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'
import getMonth from 'date-fns/get_month'
import getYear from 'date-fns/get_year'

import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'
import type { StructuredDate } from './types'

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

type Props = {
  selectedDate?: StructuredDate,
  currentDate: StructuredDate,
  onSelect: (number) => mixed,
  onBack?: () => mixed,
  onPrevYear: () => mixed,
  onNextYear: () => mixed,
  isOutOfRange: (number, number) => bool
}

type State = {
  open: bool
}

export default class MonthsView extends Component<Props, State> {
  state = {
    open: false
  }

  render () {
    const { currentDate, selectedDate, onSelect, onBack, onPrevYear, onNextYear, isOutOfRange } = this.props
    const selectedMonth = selectedDate ? selectedDate.month : null
    const now = new Date()
    const currentMonth = getMonth(now)
    const isCurrentYear = currentDate.year === getYear(now)

    return (
      <Page>
        <Header
          title={ `${currentDate.year}` }
          onClick={ onBack }
          onPrev={ onPrevYear }
          onNext={ onNextYear }
        />
        <Content className="content">
          { MONTHS.map(month => (
            <Month
              key={ month }
              current={ month === currentMonth && isCurrentYear }
              selected={ month === selectedMonth }
              outOfRange={ isOutOfRange(currentDate.year, month) }
              onMouseDown={ () => onSelect(month) }
            >
              { format(new Date(currentDate.year, month), 'MMM') }
            </Month>
          )) }
        </Content>
      </Page>
    )
  }
}

const Month = glamorous.div((props) => ({
  minWidth: '33.33%',
  ...styles.pickerItem(props)
}))
