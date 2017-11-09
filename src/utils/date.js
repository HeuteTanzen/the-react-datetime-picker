import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import getHours from 'date-fns/get_hours'
import getMinutes from 'date-fns/get_minutes'

import type { StructuredDate } from '../types'

export const structToDate = (selectedDate: StructuredDate) => {
  const { year, month, day, hour, minute } = selectedDate || {}
  return new Date(year, month, day, hour, minute)
}

export const dateToStruct = (date: Date) => {
  return {
    year: getYear(date),
    month: getMonth(date),
    day: getDate(date),
    hour: getHours(date),
    minute: getMinutes(date)
  }
}
