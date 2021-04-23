export const initialState = {
  searchValue: '',
  selectedCollege: null,
  collegesSuggestions: [],
  showSuggestions: false,
  shouldShowInitialModal: true,
  showModal: false,
  showMobileFilters: false
}

export const SearchTypes = {
  SEARCH_VALUE_CHANGED: 'SEARCH_VALUE_CHANGED',
  SELECT_COLLEGE: 'SELECT_COLLEGE',
  SUGGESTIONS_LIST_UPDATED: 'SUGGESTIONS_LIST_UPDATED',
  CLOSE_INITIAL_MODAL: 'CLOSE_INITIAL_MODAL',
  START_INITIAL_MODAL: 'START_INITIAL_MODAL',
  SHOW_MOBILE_FILTERS: 'SHOW_MOBILE_FILTERS',
  CLEAR_INPUT: 'CLEAR_INPUT'
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
        showModal: false,
        shouldShowInitialModal: false
      }
    }
    case SearchTypes.START_INITIAL_MODAL: {
      return {
        ...state,
        showModal: true
      }
    }
    case SearchTypes.SHOW_MOBILE_FILTERS: {
      return {
        ...state,
        showMobileFilters: action.payload
      }
    }
    case SearchTypes.CLEAR_INPUT: {
      return {
        ...state,
        searchValue: '',
        selectedCollege: null
      }
    }
    default: {
      return state
    }
  }
}
