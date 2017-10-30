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
  selectedMinute?: number,
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
    const { currentDate, selectedMinute, onSelect, onBack, onPrevHour, onNextHour } = this.props
    const { year, month, day, hour } = currentDate
    const shownDate = new Date(year, month, day)
    const paddedHour = paddedStr(hour)

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
              selected={ minute === selectedMinute }
              onClick={ () => onSelect(minute) }
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
  ...styles.pickerItem(props),
  display: 'block',
  lineHeight: '2em',
  width: '33.33%'
}))
