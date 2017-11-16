/* eslint-env jest */
import { paddedStr } from './string'

describe('utils/string.js', () => {
  describe('#paddedStr', () => {
    it('does nothing for two digit numbers', () => {
      expect(paddedStr(10)).toEqual('10')
    })

    it('pads one digit numbers', () => {
      expect(paddedStr(1)).toEqual('01')
    })
  })
})
