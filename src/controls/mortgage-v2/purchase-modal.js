import React from 'react'
import styled from 'styled-components'
import { useMortgageContext } from './state'
import { MortgageTypes } from './state/mortgage-reducer'

const PurchaseWhenModal = () => {
  const { state, dispatch } = useMortgageContext()
  const { showPurchaseModal } = state
  if (!showPurchaseModal) return null
  const handleModalClick = (value) => {
    dispatch({ type: MortgageTypes.SelectWhen, payload: value })
  }
  return (
    <>
      <PurchaseModalBg onClick={() => handleModalClick(null)} />
      <PurchaseModalContainer>
        <PurchaseModalHeader>
          How soon are you looking to close?
        </PurchaseModalHeader>
        <PurchaseModalButtons>
          <PurchaseModalButton onClick={() => handleModalClick('soon')}>
            Very soon
          </PurchaseModalButton>
          <PurchaseModalButton onClick={() => handleModalClick('soon')}>
            Not soon
          </PurchaseModalButton>
        </PurchaseModalButtons>
        <PurchaseModalClose onClick={() => handleModalClick(null)}>
          X
        </PurchaseModalClose>
      </PurchaseModalContainer>
    </>
  )
}
const PurchaseModalBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  opacity: 0.5;
  bottom: 0;
  z-index: 1000;
  right: 0;
`
const PurchaseModalContainer = styled.div`
  padding: 15px;
  position: fixed;
  z-index: 10001;
  background-color: #ffffff;
  width: 60%;
  border-radius: 10px;
  max-width: 769px;
  left: 20%;
  top: 300px;
`
const PurchaseModalHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #414141;
  margin-bottom: 15px;
  text-align: center;
  padding-top: 20px;
`
const PurchaseModalButtons = styled.div`
  padding-bottom: 25px;
  font-size: 12px;
  font-weight: bold;
  color: #111;
  display: block;
  text-align: center;
`
const PurchaseModalButton = styled.div`
  border-radius: 10px;
  color: #fff;
  background-color: #0951b1;
  cursor: pointer;
  width: 20%;
  border: 1px solid #ccc;
  padding: 19px;
  text-align: center;
  margin: 0;
  display: inline-block;
  margin-right: 10px;
`
const PurchaseModalClose = styled.div`
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%);
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  right: -7px;
  top: -11px;
  width: 25px;
  height: 25px;
  color: #707070;
  background: #fff;
  border-radius: 50%;
  font-size: 16px;
  line-height: 26px;
`

export default PurchaseWhenModal
