import React from 'react'
import ReactDOM from 'react-dom'
import { waitFor } from '../../utils/helpers'
import DropDowns from './dropdowns'
import PurchaseWhenModal from './purchase-modal'
import { MortgageControlsProvider } from './state'

waitFor('#dropdown__controls', () => {
  ReactDOM.render(
    <MortgageControlsProvider>
      <DropDowns />
      <PurchaseWhenModal />
    </MortgageControlsProvider>,
    document.getElementById('dropdown__controls')
  )
})
