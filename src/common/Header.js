// @flow
import React from 'react'
import glamorous from 'glamorous'

type Props = {
  title: string,
  onClick?: () => mixed,
  onNext?: () => mixed,
  onPrev?: () => mixed
}

const Wrap = glamorous.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  ...theme.Header
}))

const Navi = glamorous.div(({ theme }) => ({
  flexGrow: '1',
  ...theme.HeaderNavigation
}))

const Title = glamorous.div(({ theme }) => ({
  flexGrow: '2',
  ...theme.HeaderTitle
}))

const Header = (props: Props) => (
  <Wrap>
    <Navi onClick={ props.onPrev }>&lt;</Navi>
    <Title onClick={ props.onClick }>{ props.title }</Title>
    <Navi onClick={ props.onNext }>&gt;</Navi>
  </Wrap>
)

export default Header
