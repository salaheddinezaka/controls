import React from 'react'
import ReactDOM from 'react-dom'
import { waitFor } from '../../utils/helpers'
import DropDowns from './dropdowns'
import { MortgageControlsProvider } from './state'

waitFor('#dropdown__controls', () => {
  ReactDOM.render(<MortgageControlsProvider><DropDowns /></MortgageControlsProvider>, document.getElementById('dropdown__controls'))
})
