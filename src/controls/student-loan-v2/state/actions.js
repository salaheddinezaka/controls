import { SearchTypes } from './search-reducer'

export const handleSearchValueChanged = (newValue) => {
  return { type: SearchTypes.SEARCH_VALUE_CHANGED, payload: newValue }
}

export const handleSelectCollege = (selectedCollege) => {
  return { type: SearchTypes.SELECT_COLLEGE, payload: selectedCollege }
}

export const updateSuggestions = (suggestions) => {
  return { type: SearchTypes.SUGGESTIONS_LIST_UPDATED, payload: suggestions }
}
