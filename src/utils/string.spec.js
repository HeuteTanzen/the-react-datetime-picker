/* eslint-env jest */
import { paddedStr, parseDateString } from './string'

describe('utils/string.js', () => {
  describe('#paddedStr', () => {
    it('does nothing for two digit numbers', () => {
      expect(paddedStr(10)).toEqual('10')
    })

    it('pads one digit numbers', () => {
      expect(paddedStr(1)).toEqual('01')
    })
  })

  describe('#parseDateString', () => {
    const GERMAN_FORMAT = 'DD.MM.YYYY HH:mm'
    const SOME_FORMAT = 'HH:mm YYYY-MM-DD'
    const ONLY_DATE = 'YYYY-MM-DD'

    it('parses german formatted string', () => {
      expect(parseDateString('14.04.2019 23:59', GERMAN_FORMAT).toString()).toEqual('Sun Apr 14 2019 23:59:00 GMT+0200 (CEST)')
    })

    it('parses other formats', () => {
      expect(parseDateString('23:59 2019-04-14', SOME_FORMAT).toString()).toEqual('Sun Apr 14 2019 23:59:00 GMT+0200 (CEST)')
    })

    it('works with single digit numbers', () => {
      expect(parseDateString('1.4.2014 3:00', GERMAN_FORMAT).toString()).toEqual('Tue Apr 01 2014 03:00:00 GMT+0200 (CEST)')
    })

    it('can handle date only strings', () => {
      expect(parseDateString('2019-04-14', ONLY_DATE).toString()).toEqual('Sun Apr 14 2019 00:00:00 GMT+0200 (CEST)')
    })
  })
})
