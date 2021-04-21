import React from 'react'
import styled from 'styled-components'
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
    console.log({ type, value })
  }
  return (
    <DesktopDropDownsContainer>
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
    </DesktopDropDownsContainer>
  )
}

const DesktopDropDownsContainer = styled.div`
  display: block;
  padding: 27px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 14px 0 rgba(60, 64, 67, 0.3);
  background-color: #ffffff;
  margin-bottom: 15px;
  .controls__title {
    font-family: Poppins;
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.8;
    letter-spacing: 1.1px;
    color: #121212;
    margin-bottom: 35px;
  }
`

export default DropDowns
