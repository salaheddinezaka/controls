import {
  CreditScoreValues,
  LoanAmountValues,
  LoanPurposeValues,
  StatesValues
} from '../../../utils/default-data'

export const initialState = {
  loanPurposes: LoanPurposeValues,
  loanAmounts: LoanAmountValues,
  creditScores: CreditScoreValues,
  locations: StatesValues,
  selectedLoanPurpose: LoanPurposeValues[0],
  selectedLoanAmount: LoanAmountValues[1],
  selectedCreditScore: CreditScoreValues[2],
  selectedLocation: StatesValues[0]
}

export const MortgageTypes = {
  SelectLoanPurpose: 'SelectLoanPurpose',
  SelectLoanAmount: 'SelectLoanAmount',
  SelectLocation: 'SelectLocation',
  SelectCreditScore: 'SelectCreditScore'
}

export const MortgageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MortgageTypes.SelectLoanPurpose: {
      if (action.payload.value === 'purchase') {
        console.log('Show Modal')
      }
      return { ...state, selectedLoanPurpose: action.payload }
    }
    case MortgageTypes.SelectLoanAmount: {
      return { ...state, selectedLoanAmount: action.payload }
    }
    case MortgageTypes.SelectCreditScore: {
      return { ...state, selectedCreditScore: action.payload }
    }
    case MortgageTypes.SelectLocation: {
      return { ...state, selectedLocation: action.payload }
    }
    default: {
      return state
    }
  }
}
