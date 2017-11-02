// @flow
import glamorous from 'glamorous'

const Content = glamorous.div(({ theme }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'space-evenly',
  overflow: 'hidden',
  width: '100%',
  flexWrap: 'wrap',
  ...theme.Body
}))

export default Content
