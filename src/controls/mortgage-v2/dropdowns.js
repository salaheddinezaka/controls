import React from 'react'
import CustomDropDown from '../../components/custom-dropdown'
import { useMortgageContext } from './state'
import { MortgageTypes } from './state/mortgage-reducer'

const DropDowns = () => {
  const { state, dispatch } = useMortgageContext()
  const {
    loanPurposes,
    loanAmounts,
    creditScores,
    locations,
    selectedLoanPurpose,
    selectedLoanAmount,
    selectedCreditScore,
    selectedLocation
  } = state
  const handleOptionChanged = (type, value) => {
    dispatch({ type, payload: value })
  }
  return (
    <>
      <div className="controls__title" id="controls__DD--title">
        Which refinance lender is right for you?
      </div>
      <div className="dropdowns">
        <CustomDropDown
          label="Loan Purpose"
          options={loanPurposes}
          selectedOption={selectedLoanPurpose}
          selectionType={MortgageTypes.SelectLoanPurpose}
          handleOptionChanged={handleOptionChanged}
        />
        <CustomDropDown
          label="Credit Score"
          options={creditScores}
          selectedOption={selectedCreditScore}
          selectionType={MortgageTypes.SelectCreditScore}
          handleOptionChanged={handleOptionChanged}
        />
        <CustomDropDown
          label="Loan Amount"
          options={loanAmounts}
          selectedOption={selectedLoanAmount}
          selectionType={MortgageTypes.SelectLoanAmount}
          handleOptionChanged={handleOptionChanged}
        />
        <CustomDropDown
          label="Your Location"
          options={locations}
          selectedOption={selectedLocation}
          selectionType={MortgageTypes.SelectLocation}
          handleOptionChanged={handleOptionChanged}
        />
      </div>
    </>
  )
}

export default DropDowns
