import React from 'react'
import ReactDOM from 'react-dom'
import { waitFor } from '../../utils/helpers'
import MortgageControls from './mortgage-controls'
import { MortgageControlsProvider } from './state'

waitFor('#__controls__', () => {
  ReactDOM.render(
    <MortgageControlsProvider>
      <MortgageControls />
    </MortgageControlsProvider>,
    document.getElementById('__controls__')
  )
})
