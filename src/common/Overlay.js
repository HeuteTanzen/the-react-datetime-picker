// @flow
import glamorous from 'glamorous'

const Overlay = glamorous.div(({ theme }) => ({
  position: 'absolute',
  maxWidth: `${window.innerWidth}px`,
  zIndex: 1,
  ...theme.Overlay
}))

export default Overlay
