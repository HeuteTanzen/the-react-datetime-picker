// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import format from 'date-fns/format'

import { paddedStr } from './utils/string'
import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'
import type StructuredDate from './types'

type Props = {
  currentDate: StructuredDate,
  selectedHour?: number,
  onSelect: (number) => mixed,
  onBack: () => mixed,
  onPrevDay: () => mixed,
  onNextDay: () => mixed
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
    const { currentDate, selectedHour, onSelect, onBack, onPrevDay, onNextDay } = this.props
    const { year, month, day } = currentDate
    const shownDate = new Date(year, month, day)

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
              selected={ hour === selectedHour }
              onClick={ () => onSelect(hour) }
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
  ...styles.pickerItem(props),
  display: 'block',
  lineHeight: '2em',
  width: '25%'
}))