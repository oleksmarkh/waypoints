import { dateIsoStrToLocaleStr, coordToFixed } from './convert'

describe('Conversion utils', () => {
  describe('dateIsoStrToLocaleStr() formats ISO date-time string', () => {
    test('with "en-GB" locale by default', () => {
      expect(dateIsoStrToLocaleStr('2022-02-20T21:46:29.324689+00:00'))
        .toEqual('20 Feb 2022, 22:46:29 CET')
    })

    test('with given locale', () => {
      expect(dateIsoStrToLocaleStr('2022-02-20T21:46:29.324689+00:00', 'de-DE'))
        .toEqual('20.02.2022, 22:46:29 MEZ')

      expect(dateIsoStrToLocaleStr('2022-02-20T21:46:29.324689+00:00', 'es-ES'))
        .toEqual('20 feb 2022, 22:46:29 CET')

      expect(dateIsoStrToLocaleStr('2022-02-20T21:46:29.324689+00:00', 'en-US'))
        .toEqual('Feb 20, 2022, 10:46:29 PM GMT+1')
    })
  })

  describe('coordToFixed() represents a number in fixed-point notation', () => {
    test('with 4 digits after decimal point by default', () => {
      expect(coordToFixed(52.460923454566)).toEqual('52.4609')
      expect(coordToFixed(104.53630234573)).toEqual('104.5363')
      expect(coordToFixed(8.63)).toEqual('8.6300')
    })

    test('with given number of digits after decimal point', () => {
      expect(coordToFixed(52.460923454566, 2)).toEqual('52.46')
      expect(coordToFixed(104.53630234573, 6)).toEqual('104.536302')
      expect(coordToFixed(8.63, 0)).toEqual('9')
    })
  })
})
