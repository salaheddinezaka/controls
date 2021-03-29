import React from 'react'
import ReactDOM from 'react-dom'
import { waitFor } from '../../utils/helpers'
import DropDowns from './dropdowns'

waitFor('#dropdown__controls', () => {
  ReactDOM.render(<DropDowns />, document.getElementById('dropdown__controls'))
})
