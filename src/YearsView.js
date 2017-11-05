// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import getYear from 'date-fns/get_year'
import { autobind } from 'core-decorators'

import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'
import type { StructuredDate } from './types'

type Props = {
  selectedDate?: StructuredDate,
  onSelect: (number) => mixed,
  onBack: () => mixed,
  onPrevDecade: () => mixed,
  onNextDecade: () => mixed
}

type State = {
  pageStartYear: number,
  open: bool
}

const getYears = (startYear: number): number[] => {
  const result = []
  for (let y = 0; y < 12; ++y) result.push(startYear + y)
  return result
}

const getPageStartYear = (currentYear: number): number => (
  currentYear - currentYear % 10 - 1
)

export default class YearsView extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      open: false,
      pageStartYear: getPageStartYear((props.selectedDate && props.selectedDate.year) || getYear(new Date()))
    }
  }

  @autobind
  lastPage () {
    this.setState({
      pageStartYear: this.state.pageStartYear - 10
    })
    this.props.onPrevDecade()
  }

  @autobind
  nextPage () {
    this.setState({
      pageStartYear: this.state.pageStartYear + 10
    })
    this.props.onNextDecade()
  }

  render () {
    const { selectedDate, onBack } = this.props
    const currentYear = getYear(new Date())
    const selectedYear = selectedDate ? selectedDate.year : currentYear
    const years = getYears(this.state.pageStartYear)

    return (
      <Page>
        <Header
          title={ `${selectedYear}` }
          onClick={ onBack }
          onPrev={ this.lastPage }
          onNext={ this.nextPage }
        />
        <Content className="content">
          { years.map(year => (
            <Year
              key={ year }
              current={ year === currentYear }
              selected={ year === selectedYear }
              onMouseDown={ () => this.props.onSelect(year) }
            >
              { year }
            </Year>
          )) }
        </Content>
      </Page>
    )
  }
}

const Year = glamorous.div((props) => ({
  minWidth: '33.33%',
  ...styles.pickerItem(props)
}))
