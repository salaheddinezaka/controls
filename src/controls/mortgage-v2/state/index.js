import React, { createContext, useContext, useReducer } from 'react'
import { initialState, MortgageReducer } from './mortgage-reducer'

const MortgageControlsContext = createContext()

export const MortgageControlsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MortgageReducer, initialState)
  return (
    <MortgageControlsContext.Provider value={{ state, dispatch }}>
      {children}
    </MortgageControlsContext.Provider>
  )
}

export const useMortgageContext = () => useContext(MortgageControlsContext)
