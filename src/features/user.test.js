import * as userActions from './user'
import userReducer from './user'

describe('User Actions', () => {
  it('should create a fetching action object', () => {
    expect(userActions.fetching())
      .toEqual({ type: 'user/fetching' })
  })

  it('should create a resolved action object', () => {
    expect(userActions.resolved('data'))
      .toEqual({ type: 'user/resolved', payload: 'data' })
  })

  it('should create a authorized action object', () => {
    expect(userActions.authorized('data'))
      .toEqual({ type: 'user/authorized', payload: 'data' })
  })

  it('should create a rejected action object', () => {
    expect(userActions.rejected('error'))
      .toEqual({ type: 'user/rejected', payload:'error' })
  })
})

describe('User Reducer', () => {
  it('should return the initial state when state is undefined', () => {
    expect(userReducer(undefined, { type: '@INIT' }))
      .toEqual({ status: 'void', auth: { token: null, }, data: { id: null, lastName: null, firstName: null, email: null, password: null, }, error: null })
  })

  it('should add user id key on fetching', () => {
    expect(userReducer({ status: 'void', data: null, error: null }, userActions.fetching()))
      .toEqual({ status: 'pending', data: null, error: null })
  })

  it('should resolved user', () => {
    const state = userReducer({data:null, error:null, status:'pending'}, userActions.resolved({firstName:'test', lastName:'test'}))
    expect(state.status).toBe('resolved')
  })

  it('should switch to updating when fetching on resolved', () => {
    const state = userReducer({data:'full', error:null, status:'resolved'}, userActions.fetching())
    expect(state.status).toBe('updating')
  })

  it('should ignore rejected on resolved', () => {
    const state = userReducer({data:null, error:null, status:'resolved'}, userActions.rejected('error'))
    expect(state.status).toBe('resolved')
  })
})