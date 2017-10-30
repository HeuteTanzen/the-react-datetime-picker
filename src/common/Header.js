// @flow
import React from 'react'
import glamorous from 'glamorous'

type Props = {
  title: string,
  onClick?: () => mixed,
  onNext?: () => mixed,
  onPrev?: () => mixed
}

const Wrap = glamorous.div({
  display: 'flex',
  justifyContent: 'space-between'
})

const sharedStyles = {
  cursor: 'pointer',
  textAlign: 'center',
  lineHeight: '1.6',

  ':hover': {
    background: '#eeeeee'
  }
}

const Navi = glamorous.div({
  ...sharedStyles,
  flexGrow: '1'
})

const Title = glamorous.div({
  ...sharedStyles,
  flexGrow: '2'
})

const Header = (props: Props) => (
  <Wrap>
    <Navi onClick={ props.onPrev }>&lt;</Navi>
    <Title onClick={ props.onClick }>{ props.title }</Title>
    <Navi onClick={ props.onNext }>&gt;</Navi>
  </Wrap>
)

export default Header
