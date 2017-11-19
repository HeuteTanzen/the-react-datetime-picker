/* eslint-env jest */
import { structToDate, dateToStruct, isOutOfRange } from './date'

describe('utils/string.js', () => {
  describe('#structToDate', () => {
    it('creates a Date instance for given struct', () => {
      expect(structToDate({ year: 2017, month: 11, day: 24, hour: 18, minute: 0 }))
        .toEqual(new Date(2017, 11, 24, 18, 0))
    })
  })

  describe('#dateToStruct', () => {
    it('crates a struct for given Date instance', () => {
      expect(dateToStruct(new Date(2017, 11, 24, 18, 0)))
        .toEqual({ year: 2017, month: 11, day: 24, hour: 18, minute: 0 })
    })
  })

  describe('isOutOfRange', () => {
    const min = new Date(2017, 1, 1, 18, 0)
    const max = new Date(2017, 11, 24, 18, 0)

    describe('if giving both min and max', () => {
      it('the min Date is included', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 1, 1, 17, 59)).toBe(true)
      })

      it('the max Date is excluded', () => {
        expect(isOutOfRange(min, max, 2017, 11, 24, 18, 0)).toBe(true)
        expect(isOutOfRange(min, max, 2017, 11, 24, 17, 59)).toBe(false)
      })

      it('checks if years are in', () => {
        expect(isOutOfRange(min, max, 2017)).toBe(false)
      })

      it('checks if years are out', () => {
        expect(isOutOfRange(min, max, 2016)).toBe(true)
        expect(isOutOfRange(min, max, 2018)).toBe(true)
      })

      it('checks if months are in', () => {
        expect(isOutOfRange(min, max, 2017, 1)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 10)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 11)).toBe(false)
      })

      it('checks if months are out', () => {
        expect(isOutOfRange(min, max, 2017, 0)).toBe(true)
        expect(isOutOfRange(min, max, 2018, 0)).toBe(true)
      })

      it('checks if days are in', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 11, 24)).toBe(false)
      })

      it('checks if days are out', () => {
        expect(isOutOfRange(min, max, 2017, 0, 31)).toBe(true)
        expect(isOutOfRange(min, max, 2017, 11, 25)).toBe(true)
        expect(isOutOfRange(min, max, 2016, 11, 24)).toBe(true)
      })

      it('checks if hours are in', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1, 18)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 11, 24, 18)).toBe(false)
      })

      it('checks if hours are out', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1, 17)).toBe(true)
        expect(isOutOfRange(min, max, 2017, 11, 24, 19)).toBe(true)
      })

      it('checks if minutes are in', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(min, max, 2017, 11, 24, 17, 59)).toBe(false)
      })

      it('checks if minutes are out', () => {
        expect(isOutOfRange(min, max, 2017, 1, 1, 17, 59)).toBe(true)
        expect(isOutOfRange(min, max, 2017, 11, 24, 18, 0)).toBe(true)
      })
    })

    describe('if only giving min', () => {
      it('checks if years are in', () => {
        expect(isOutOfRange(min, null, 2017)).toBe(false)
        expect(isOutOfRange(min, null, 2018)).toBe(false)
        expect(isOutOfRange(min, null, 2019)).toBe(false)
      })

      it('checks if years are out', () => {
        expect(isOutOfRange(min, null, 2016)).toBe(true)
      })

      it('checks if months are in', () => {
        expect(isOutOfRange(min, null, 2017, 1)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 10)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11)).toBe(false)
        expect(isOutOfRange(min, null, 2018, 0)).toBe(false)
      })

      it('checks if months are out', () => {
        expect(isOutOfRange(min, null, 2017, 0)).toBe(true)
      })

      it('checks if days are in', () => {
        expect(isOutOfRange(min, null, 2017, 1, 1)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 24)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 25)).toBe(false)
      })

      it('checks if days are out', () => {
        expect(isOutOfRange(min, null, 2017, 0, 31)).toBe(true)
      })

      it('checks if hours are in', () => {
        expect(isOutOfRange(min, null, 2017, 1, 1, 18)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 24, 18)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 24, 19)).toBe(false)
      })

      it('checks if hours are out', () => {
        expect(isOutOfRange(min, null, 2017, 1, 1, 17)).toBe(true)
      })

      it('checks if minutes are in', () => {
        expect(isOutOfRange(min, null, 2017, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 24, 17, 59)).toBe(false)
        expect(isOutOfRange(min, null, 2017, 11, 24, 18, 0)).toBe(false)
      })

      it('checks if minutes are out', () => {
        expect(isOutOfRange(min, null, 2017, 1, 1, 17, 59)).toBe(true)
      })
    })

    describe('if only giving max', () => {
      it('checks if years are in', () => {
        expect(isOutOfRange(null, max, 2017)).toBe(false)
        expect(isOutOfRange(null, max, 2016)).toBe(false)
      })

      it('checks if years are out', () => {
        expect(isOutOfRange(null, max, 2018)).toBe(true)
      })

      it('checks if months are in', () => {
        expect(isOutOfRange(null, max, 2017, 0)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 1)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 10)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 11)).toBe(false)
      })

      it('checks if months are out', () => {
        expect(isOutOfRange(null, max, 2018, 0)).toBe(true)
      })

      it('checks if days are in', () => {
        expect(isOutOfRange(null, max, 2017, 0, 31)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 1, 1)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 11, 24)).toBe(false)
      })

      it('checks if days are out', () => {
        expect(isOutOfRange(null, max, 2017, 11, 25)).toBe(true)
      })

      it('checks if hours are in', () => {
        expect(isOutOfRange(null, max, 2017, 1, 1, 17)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 1, 1, 18)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 11, 24, 18)).toBe(false)
      })

      it('checks if hours are out', () => {
        expect(isOutOfRange(null, max, 2017, 11, 24, 19)).toBe(true)
      })

      it('checks if minutes are in', () => {
        expect(isOutOfRange(null, max, 2017, 1, 1, 17, 59)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(null, max, 2017, 11, 24, 17, 59)).toBe(false)
      })

      it('checks if minutes are out', () => {
        expect(isOutOfRange(null, max, 2017, 11, 24, 18, 0)).toBe(true)
      })
    })

    describe('if neither min nor max is given', () => {
      it('there is no date out or range', () => {
        expect(isOutOfRange(null, null, 2017, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(null, null, 2017, 1, 1, 17, 0)).toBe(false)
        expect(isOutOfRange(null, null, 0, 0, 1, 0, 1)).toBe(false)
        expect(isOutOfRange(null, null, 2018, 1, 1, 18, 0)).toBe(false)
        expect(isOutOfRange(null, null, 9999, 1, 1, 18, 0)).toBe(false)
      })
    })
  })
})
