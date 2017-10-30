
export const pickerItem = (props) => ({
  backgroundColor: props.selected ? '#ddddff' : (props.current ? '#ffffdd' : 'transparent'),
  cursor: 'pointer',
  lineHeight: '2em',
  textAlign: 'center',

  ':hover': {
    background: '#dedede'
  }
})
