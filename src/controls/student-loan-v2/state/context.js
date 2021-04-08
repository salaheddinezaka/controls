import React, { createContext, useContext, useReducer } from 'react'
import { SearchReducer, initialState } from './search-reducer'

const PSLContext = createContext()

export const PrivateStudentLoanSearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState)
  return (
    <PSLContext.Provider value={{ state, dispatch }}>
      {children}
    </PSLContext.Provider>
  )
}

export const usePSLContext = () => useContext(PSLContext)
