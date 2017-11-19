import getYear from 'date-fns/get_year'
import getMonth from 'date-fns/get_month'
import getDate from 'date-fns/get_date'
import getHours from 'date-fns/get_hours'
import getMinutes from 'date-fns/get_minutes'

import startOfYear from 'date-fns/start_of_year'
import startOfMonth from 'date-fns/start_of_month'
import startOfDay from 'date-fns/start_of_day'
import startOfHour from 'date-fns/start_of_hour'
import startOfMinute from 'date-fns/start_of_minute'
import endOfYear from 'date-fns/end_of_year'
import endOfMonth from 'date-fns/end_of_month'
import endOfDay from 'date-fns/end_of_day'
import endOfHour from 'date-fns/end_of_hour'
import endOfMinute from 'date-fns/end_of_minute'

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

export const isOutOfRange = (min: ?Date, max: ?Date, year: number, month?:number, day?: number, hour?: number, minute?: number): bool => {
  if (!min && !max) return false

  let time = new Date(year, month || 0, day || 1, hour || 1, minute || 1).getTime()
  if (typeof month === 'undefined') {
    const minTime = min ? startOfYear(min).getTime() : 0
    const maxTime = max ? endOfYear(max).getTime() : 0
    return (min && time < minTime) || (max && time > maxTime) || false
  }
  if (typeof day === 'undefined') {
    const minTime = min ? startOfMonth(min).getTime() : 0
    const maxTime = max ? endOfMonth(max).getTime() : 0
    return (min && time < minTime) || (max && time > maxTime) || false
  }
  if (typeof hour === 'undefined') {
    const minTime = min ? startOfDay(min).getTime() : 0
    const maxTime = max ? endOfDay(max).getTime() : 0
    return (min && time < minTime) || (max && time > maxTime) || false
  }
  if (typeof minute === 'undefined') {
    const minTime = min ? startOfHour(min).getTime() : 0
    const maxTime = max ? endOfHour(max).getTime() : 0
    return (min && time < minTime) || (max && time > maxTime) || false
  }
  const minTime = min ? startOfMinute(min).getTime() : 0
  const maxTime = max ? endOfMinute(max).getTime() : 0
  return (min && time < minTime) || (max && time > maxTime) || false
}
