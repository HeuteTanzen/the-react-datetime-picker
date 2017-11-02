// @flow
import glamorous from 'glamorous'

const Overlay = glamorous.div(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  ...theme.Overlay
}))

export default Overlay
