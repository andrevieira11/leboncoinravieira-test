import { getLoggedUserId } from '../getLoggedUserInfo'

describe('getLoggedUserId', () => {
  it('should return logged user id', () => {
    const expected = 1

    expect(getLoggedUserId()).toEqual(expected)
  })
})