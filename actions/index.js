export const ADD_DECK = 'ADD_DECK'
export const GET_DECKS = 'GET_DECKS'

export const addDeck = deck => ({ type: ADD_DECK, payload: deck })

export const getDecks = decks => ({ type: GET_DECKS, payload: decks })
