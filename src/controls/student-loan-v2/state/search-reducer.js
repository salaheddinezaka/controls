export const initialState = {
  searchValue: '',
  selectedCollege: null,
  collegesSuggestions: [],
  showSuggestions: false,
  showModal: true
}

export const SearchTypes = {
  SEARCH_VALUE_CHANGED: 'SEARCH_VALUE_CHANGED',
  SELECT_COLLEGE: 'SELECT_COLLEGE',
  SUGGESTIONS_LIST_UPDATED: 'SUGGESTIONS_LIST_UPDATED',
  CLOSE_INITIAL_MODAL: 'CLOSE_INITIAL_MODAL'
}

export const SearchReducer = (state = initialState, action) => {
  if (!action) return state
  switch (action.type) {
    case SearchTypes.SEARCH_VALUE_CHANGED: {
      return { ...state, searchValue: action.payload, showSuggestions: true }
    }
    case SearchTypes.SUGGESTIONS_LIST_UPDATED: {
      return { ...state, collegesSuggestions: action.payload }
    }
    case SearchTypes.SELECT_COLLEGE: {
      return {
        ...state,
        selectedCollege: action.payload,
        searchValue: action.payload.school_name,
        showSuggestions: false
      }
    }
    case SearchTypes.CLOSE_INITIAL_MODAL: {
      return {
        ...state,
        showModal: false
      }
    }
    default: {
      return state
    }
  }
}
