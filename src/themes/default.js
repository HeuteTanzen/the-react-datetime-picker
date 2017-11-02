// @flow
export default {
  outsideItem: {
    color: '#999'
  },
  selectedItem: {
    backgroundColor: '#ddddff'
  },
  currentItem: {
    backgroundColor: '#ffffdd'
  },
  Overlay: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    width: '300px'
  },
  Body: {
    borderTop: '1px solid #444'
  },
  Header: {
    lineHeight: '1.6',
    textAlign: 'center'
  },
  HeaderTitle: {
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#eeeeee'
    }
  },
  HeaderNavigation: {
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#eeeeee'
    }
  },
  Item: {
    cursor: 'pointer',
    lineHeight: '2',
    textAlign: 'center',

    ':hover': {
      backgroundColor: '#dedede'
    }
  }
}
