import { updateInList, prependToList, excludeFromList } from './list'

describe('List manipulation utils (immutable)', () => {
  describe('updateInList()', () => {
    test('creates new list with a given updated item', () => {
      const first = { name: 'first', score: 12 }
      const second = { name: 'second', score: 10 }
      const third = { name: 'third', score: 8 }
      const list = [ first, second, third ]

      expect(updateInList(list, second, { name: 'the second' }))
        .toEqual([ first, { name: 'the second', score: 10 }, third ])

      // input list was not mutated
      expect(list).toEqual([ first, second, third ])

      // substituted item was not mutated
      expect(second).toEqual({ name: 'second', score: 10 })
    })
  })

  describe('prependToList()', () => {
    test('creates new list by placing a given item first', () => {
      const l1: number[] = [ 1, 2, 5 ]
      expect(prependToList(l1, 10)).toEqual([ 10, 1, 2, 5 ])
      expect(l1).toEqual([ 1, 2, 5 ]) // wasn't mutated

      const l2: number[] = []
      expect(prependToList(l2, 100)).toEqual([ 100 ])
      expect(l2).toEqual([]) // wasn't mutated
    })
  })

  describe('excludeFromList()', () => {
    test('creates new list by filtering a given item out', () => {
      const first = { name: 'first', score: 12 }
      const second = { name: 'second', score: 10 }
      const third = { name: 'third', score: 8 }
      const another = { name: 'another', score: 5 }
      const list = [ first, second, third ]

      expect(excludeFromList(list, another))
        .toEqual([ first, second, third ]) // nothing to exclude
      expect(excludeFromList(list, first)).toEqual([ second, third ])
      expect(excludeFromList(list, second)).toEqual([ first, third ])
      expect(excludeFromList(list, third)).toEqual([ first, second ])
      expect(list).toEqual([ first, second, third ]) // wasn't mutated
    })
  })
})
