// @flow
const borderRadius = '4px'
const hoverColorBg = '#eee'

export default {
  Overlay: {
    backgroundColor: '#fff',
    border: '1px solid #999',
    borderRadius,
    overflow: 'hidden',
    width: '300px'
  },
  Body: {
  },
  Header: {
    lineHeight: '1.6',
    textAlign: 'center'
  },
  HeaderTitle: {
    cursor: 'pointer',

    ':hover': {
      backgroundColor: hoverColorBg
    }
  },
  HeaderNavigation: {
    cursor: 'pointer',

    ':hover': {
      backgroundColor: hoverColorBg
    }
  },
  Item: {
    cursor: 'pointer',
    lineHeight: '2',
    textAlign: 'center',
    borderRadius,
    boxSizing: 'border-box',

    ':hover': {
      backgroundColor: hoverColorBg
    }
  },
  outsideItem: {
    color: '#999'
  },
  selectedItem: {
    backgroundColor: '#001165',
    color: '#fff'
  },
  currentItem: {
    backgroundColor: '#5cb1bf',
    color: '#fff'
  }
}
