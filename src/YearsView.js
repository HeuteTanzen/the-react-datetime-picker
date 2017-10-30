// @flow
import React, { Component } from 'react'
import glamorous from 'glamorous'
import getYear from 'date-fns/get_year'
import { autobind } from 'core-decorators'

import Page from './common/Page'
import Content from './common/Content'
import Header from './common/Header'
import * as styles from './styles'

type Props = {
  selectedYear: number,
  onSelect: (number) => mixed
}

type State = {
  selectedYear: number,
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
    const selectedYear = props.selectedYear || getYear(new Date())
    this.state = {
      open: false,
      selectedYear,
      pageStartYear: getPageStartYear(selectedYear)
    }
  }

  @autobind
  lastPage () {
    this.setState({
      pageStartYear: this.state.pageStartYear - 10
    })
  }

  @autobind
  nextPage () {
    this.setState({
      pageStartYear: this.state.pageStartYear + 10
    })
  }

  render () {
    const { selectedYear } = this.props
    const years = getYears(this.state.pageStartYear)
    return (
      <Page>
        <Header
          title={ `${selectedYear}` }
          onPrev={ this.lastPage }
          onNext={ this.nextPage }
        />
        <Content className="content">
          { years.map(year => (
            <Year
              key={ year }
              selected={ year === selectedYear }
              onClick={ () => this.props.onSelect(year) }
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
  ...styles.pickerItem(props),
  display: 'block',
  minWidth: '33.33%'
}))
