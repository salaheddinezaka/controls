import React from 'react'
import CustomDropDown from '../../components/custom-dropdown'

const DropDowns = () => {
  const handleOptionChanged = () => {
    console.log('Select Changed')
  }
  return (
    <>
      <div className="controls__title" id="controls__DD--title">
        Which refinance lender is right for you?
      </div>
      <div className="dropdowns">
        <CustomDropDown
          label="Loan Purpose"
          options={[
            { value: 'refi', text: 'Refinance' },
            { value: 'purchase', text: 'Purchase' },
            { value: 'equity', text: 'Equity' }
          ]}
          selectedOption={{ value: 'refi', text: 'Refinance' }}
          handleOptionChanged={handleOptionChanged}
        />
      </div>
    </>
  )
}

export default DropDowns
