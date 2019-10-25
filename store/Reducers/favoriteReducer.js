const initialState = {
  favoriteCities: []
}

function toggleFavorite(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'ADD_FAVORITE':
      console.log('add favorite', action.value)
      return nextState || state
    case 'REMOVE_FAVORITE':
      return nextState || state
    case 'UPDATE_FAVORITE':
      return nextState || state
    default:
      return state
  }
}

export default toggleFavorite