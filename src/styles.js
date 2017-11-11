// @flow
export const pickerItem = ({ outside, selected, current, outOfRange, theme }: Object) => ({
  ...theme.Item,
  ...(outside ? theme.outsideItem : {}),
  ...(current ? theme.currentItem : {}),
  ...(selected ? theme.selectedItem : {}),
  ...(outOfRange ? theme.outsideRangeItem : {})
})
