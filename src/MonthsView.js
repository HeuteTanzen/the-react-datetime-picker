// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'

import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'
import type StructuredDate from './types'

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

type Props = {
  selectedMonth?: number,
  currentDate: StructuredDate,
  onSelect: (number) => mixed,
  onBack?: () => mixed,
  onPrevYear: () => mixed,
  onNextYear: () => mixed
}

type State = {
  open: bool
}

export default class MonthsView extends Component<Props, State> {
  state = {
    open: false
  }

  render () {
    const { currentDate, selectedMonth, onSelect, onBack, onPrevYear, onNextYear } = this.props

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
              selected={ month === selectedMonth }
              onClick={ () => onSelect(month) }
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
  ...styles.pickerItem(props),
  lineHeight: '2em',
  minWidth: '33.33%'
}))