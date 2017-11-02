// @flow
export const pickerItem = ({ outside, selected, current, theme }: Object) => ({
  ...theme.Item,
  ...(outside ? theme.outsideItem : {}),
  ...(current ? theme.currentItem : {}),
  ...(selected ? theme.selectedItem : {})
})
