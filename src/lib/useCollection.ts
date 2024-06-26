import { useCallback, useEffect, useReducer } from 'react'
import * as collection from './collection'

export type State =
  | { type: 'loading' }
  | { type: 'idle'; cards: Array<collection.CardData> }
  | { type: 'error'; error: Error }
  | { type: 'creating'; cards: Array<collection.CardData> }
// | { type: 'waiting-creation'; cards: Array<CardData> }
// | { type: 'creation-failed'; cards: Array<CardData>; error: Error }

export const initial: State = { type: 'loading' }

export type Action =
  | { type: 'got-cards'; cards: Array<collection.CardData> }
  | { type: 'got-error'; error: Error }
  | { type: 'started-create' }
  | { type: 'canceled-create' }
  | { type: 'got-card'; card: collection.CardData }

export const reducer = (state: State, action: Action): State => {
  switch (state.type) {
    case 'loading':
      switch (action.type) {
        case 'got-cards':
          return { type: 'idle', cards: action.cards }
        case 'got-error':
          return { type: 'error', error: action.error }
        default:
          return state
      }
    case 'idle':
      switch (action.type) {
        case 'started-create':
          return { type: 'creating', cards: state.cards }
        default:
          return state
      }

    case 'creating':
      switch (action.type) {
        case 'canceled-create':
          return { type: 'idle', cards: state.cards }
        case 'got-card':
          return { type: 'idle', cards: [...state.cards, action.card] }
        case 'got-error':
          return { type: 'error', error: action.error }
        default:
          return state
      }

    default:
      return state
  }
}

export type Commands = ReturnType<typeof useCollection>[1]

export const useCollection = () => {
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(() => {
    collection.fetchAll().then(
      (cards) => dispatch({ type: 'got-cards', cards }),
      (error) => dispatch({ type: 'got-error', error })
    )
  }, [])

  return [
    state,
    {
      openCreate: useCallback(() => dispatch({ type: 'started-create' }), []),
      create: useCallback((data: collection.CardData) => {
        collection.create(data).then(
          (card) => dispatch({ type: 'got-card', card }),
          (error) => dispatch({ type: 'got-error', error })
        )
      }, []),
      cancelCreate: useCallback(
        () => dispatch({ type: 'canceled-create' }),
        []
      ),
    },
  ] as const
}
