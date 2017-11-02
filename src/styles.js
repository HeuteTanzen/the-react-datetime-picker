
export const pickerItem = ({ outside, selected, current, theme }) => ({
  ...theme.Item,
  ...(outside ? theme.outsideItem : {}),
  ...(current ? theme.currentItem : {}),
  ...(selected ? theme.selectedItem : {})
})
