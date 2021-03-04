"use strict";
import { getStates } from './states'
import { waitFor } from '../helpers'
import $ from 'jquery'
import axios from 'axios'
import './style.css'

if (window.zoneAttributes === undefined) {
  window.zoneAttributes = {}
}

function setZoneAttributes(attribute, value) {
  window.zoneAttributes[attribute] = value
}

function updateZoneAttribute() {
  window.renderAdFeed(window.zoneAttributes)
}

function toggleDropDown(id, newText = null) {
  $(`${id} .dd_option`).toggle()
  if ($(`${id} .dd_option`).is(':visible')) {
    $(`${id} .arr`).css('transform', 'rotate(-135deg)')
  } else {
    $(`${id} .arr`).css('transform', 'rotate(45deg)')
  }
  if (newText) $(`${id} .dd__value`).text(newText)
}

export function dropdownSelectHandler(attribute, value, textValue) {
  setZoneAttributes(attribute, value)
  updateZoneAttribute()
  switch (value) {
    case 'refi':
    case 'equity': {
      toggleDropDown('#loanPurposeDD', textValue)
      break
    }
    case 'purchase': {
      toggleDropDown('#loanPurposeDD', textValue)
      $('#purchasOverlayPanel').show()
      break
    }
    case 'excllent':
    case 'good':
    case 'fair':
    case 'poor': {
      toggleDropDown('#creditScoreDD', textValue)
      break
    }
    case '100':
    case '100-250':
    case '250-400':
    case '400+': {
      toggleDropDown('#loanAmountDD', textValue)
      break
    }
    default: {
      toggleDropDown('#locationDD', textValue)
      break
    }
  }
}

function insertLoanPurposeDropDown() {
  const DD = document.createElement('div')
  DD.id = 'loanPurposeDD'
  DD.className = 'dlpPanel'
  DD.innerHTML = `
      <div class="cutomDD">
        <div class="select_option">
          <div class="label_text">Loan Purpose</div>
          <div class="selected dd__value">Home Refinance</div>
          <div class="arr"></div>
        </div>
        <ul class="dd_option" style="display: none;">
          <li class="refi" onclick="cym.dropdownSelectHandler('data-loan-purpose', 'refi', 'Home Refinance')">Home Refinance</li>
          <li class="purch" onclick="cym.dropdownSelectHandler('data-loan-purpose', 'purchase', 'Home Purchase')">Home Purchase</li>
          <li class="equity" onclick="cym.dropdownSelectHandler('data-loan-purpose', 'equity', 'Home Equity')">Home Equity</li>
        </ul>
      </div>
    `
  $('.dropdowns__container').append(DD)
  $('#loanPurposeDD .select_option').on('click', () => {
    toggleDropDown('#loanPurposeDD')
  })
}

function insertCreditScoreDropDown() {
  const DD = document.createElement('div')
  DD.id = 'creditScoreDD'
  DD.className = 'dlpPanel'
  DD.innerHTML = `
      <div class="cutomDD">
        <div class="select_option">
          <div class="label_text">Credit Score</div>
          <div class="selected dd__value">Good (580-699)</div>
          <div class="arr"></div>
        </div>
        <ul class="dd_option" style="display: none;">
          <li onclick="cym.dropdownSelectHandler('data-credit-score', 'excllent', 'Excellent (700+)')">Excellent (700+)</li>
          <li onclick="cym.dropdownSelectHandler('data-credit-score', 'good', 'Good (580-699)')">Good (580-699)</li>
          <li onclick="cym.dropdownSelectHandler('data-credit-score', 'fair', 'Fair (520-579)')">Fair (520-579)</li>
          <li onclick="cym.dropdownSelectHandler('data-credit-score', 'poor', 'Poor (519 or lower)')">Poor (519 or lower)</li>
        </ul>
      </div>
    `
  $('.dropdowns__container').append(DD)
  $('#creditScoreDD .select_option').on('click', () => {
    toggleDropDown('#creditScoreDD')
  })
}

function insertLoanAmountDropDown() {
  const DD = document.createElement('div')
  DD.id = 'loanAmountDD'
  DD.className = 'dlpPanel'
  DD.innerHTML = `
      <div class="cutomDD">
        <div class="select_option">
          <div class="label_text">Loan Amount</div>
          <div class="selected dd__value">100K - 250K</div>
          <div class="arr"></div>
        </div>
        <ul class="dd_option" style="display: none;">
          <li onclick="cym.dropdownSelectHandler('data-loan-amount', '100', 'Up to 100K')">Up to 100K</li>
          <li onclick="cym.dropdownSelectHandler('data-loan-amount', '100-250', '100K - 250K')">100K - 250K</li>
          <li onclick="cym.dropdownSelectHandler('data-loan-amount', '250-400', '250K - 400K')">250K - 400K</li>
          <li onclick="cym.dropdownSelectHandler('data-loan-amount', '400+', '400K and Up')">400K and Up</li>
        </ul>
      </div>
    `
  $('.dropdowns__container').append(DD)
  $('#loanAmountDD .select_option').on('click', () => {
    toggleDropDown('#loanAmountDD')
  })
}

async function insertLocationDropDown() {
  const DD = document.createElement('div')
  DD.id = 'locationDD'
  DD.className = 'dlpPanel'
  const userLocation = await axios.get('https://geometer.lincx.la/api/lookup')
  DD.innerHTML = `
      <div class="cutomDD">
        <div class="select_option">
          <div class="label_text">Your Location</div>
          <div class="selected dd__value">${
            userLocation.data.regionName || 'California'
          }</div>
          <div class="arr"></div>
        </div>
        <ul class="dd_option" style="display: none;">
          ${getStates()
            .map(
              (state) =>
                `<li onclick="cym.dropdownSelectHandler('data-location', '${state.abbreviation}', '${state.name}')">${state.name}</li>`
            )
            .join('\n')}
        </ul>
      </div>
    `
  $('.dropdowns__container').append(DD)
  $('#locationDD .select_option').on('click', () => {
    toggleDropDown('#locationDD')
  })
}

function insertModal() {
  const purchaseModal = document.createElement('div')
  purchaseModal.id = 'purchasOverlayPanel'
  purchaseModal.className = 'dlpPanel'
  purchaseModal.innerHTML = `
    <div id="purchaseOverlayBgContainer" class="dlpPanel"></div>
    <div id="cymPurchaseOverlayDiv" class="dlpPanel">
      <div id="purchaseMainOverlayDiv" class="dlpPanel">
        <div id="headlinePurchaseDiv" class="dlpPanel">
          How soon are you looking to close?
        </div>
        <div id="purchaseOrderDiv" class="dlpPanel">
          <div id="verySoonDiv" class="dlpPanel" onclick="cym.handleModalButtonsClick('verySoon')">Very soon</div>
          <div id="notSoonDiv" class="dlpPanel" onclick="cym.handleModalButtonsClick('notSoon')">Not soon</div>
        </div>
        <div id="closePurchaseOverlayDiv" onclick="cym.handleModalButtonsClick('none')">X</div>
      </div>
    </div>
  `
  document.body.append(purchaseModal)
}

export function handleModalButtonsClick(value) {
  console.log({value})
  $('#purchasOverlayPanel').hide()
}

function insertMobileModalButton() {
  const modalButton = document.createElement('button')
  modalButton.id = 'mobile-filters'
  modalButton.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:v="https://vecta.io/nano" viewBox="0 0 477.867 477.867"><path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z"/></svg>
  <span>Customize Results</span>
  `
  modalButton.onclick = toggleMobileModal
  document.body.append(modalButton)
}

export function handleSelectChanged(value) {
  switch (value.id) {
    case 'loanPurpose': {
      if (value.value === 'purchase') {
        $('#closing').show()
      } else {
        $('#closing').hide()
      }
      break
    }
    case 'creditScore': {
      break
    }
    case 'loanAmount': {
      break
    }
    case 'location': {
      break
    }
    default:
      break
  }
}

export function handleMobileRunFilter() {
  const purposeValue = $('#loanPurpose').val()
  setZoneAttributes('data-loan-purpose', purposeValue)

  if (purposeValue === 'purchase') {
    const whenValue = $('#when').val()
    setZoneAttributes('data-when', whenValue)
  }

  const creditScoreValue = $('#creditScore').val()
  setZoneAttributes('data-credit-score', creditScoreValue)

  const loanAmountValue = $('#loanAmount').val()
  setZoneAttributes('data-loan-amount', loanAmountValue)

  const locationValue = $('#location').val()
  setZoneAttributes('data-location', locationValue)

  updateZoneAttribute()
  toggleMobileModal()
}

async function insertMobileModal() {
  const mobileModal = document.createElement('div')
  let userLocation;
  try {
    userLocation = await axios.get('https://geometer.lincx.la/api/lookup')
  } catch (error) {
    console.log(error)
  }
  mobileModal.innerHTML = `
      <div id="mobileModalContainer">
      <div id="mobileOverlay"></div>
      <div id="mobileModal">
        <div class="modalHeader">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" xmlns:v="https://vecta.io/nano" viewBox="0 0 477.867 477.867"><path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z"/></svg>
          <span>Customise Results</span>
        </div>
        <div class="modalBody">
          <div class="controlGroup">
            <label for="loanPurpose">Loan Purpose</label>
            <div class="mobileDD">
              <select id="loanPurpose" onchange="cym.handleSelectChanged(this)">
                <option value="refi">Home Refinance</option>
                <option value="purchase">Home Purchase</option>
                <option value="equity">Home Equity</option>
              </select>
            </div>
          </div>

          <div class="controlGroup" id="closing" style="display: none;">
            <label for="when">How soon are you looking to close?</label>
            <div class="mobileDD">
              <select id="when" onchange="cym.handleSelectChanged(this)">
                <option value="soon">Very soon</option>
                <option value="not-soon">Not soon</option>
              </select>
            </div>
          </div>

          <div class="controlGroup">
            <label for="creditScore">Credit Score</label>
            <div class="mobileDD">
              <select id="creditScore" onchange="cym.handleSelectChanged(this)">
                <option value="excellent">Excellent (700+)</option>
                <option value="good" selected>Good (580-699)</option>
                <option value="fair">Fair (520-579)</option>
                <option value="poor">Poor (519 or lower)</option>
              </select>
            </div>
          </div>

          <div class="controlGroup">
            <label for="loanAmount">Loan Amount</label>
            <div class="mobileDD">
              <select id="loanAmount" onchange="cym.handleSelectChanged(this)">
                <option value="100">Up to 100K</option>
                <option value="100-250" selected>100K - 250K</option>
                <option value="250-400">250K - 400K</option>
                <option value="400+">400K and Up</option>
              </select>
            </div>
          </div>

          <div class="controlGroup">
            <label for="location">Your Location</label>
            <div class="mobileDD">
              <select id="location" onchange="cym.handleSelectChanged(this)">
                ${getStates()
                  .map(
                    (state) => `
                      <option value="${state.abbreviation}"
                        ${
                          state.abbreviation === userLocation?.data?.region
                            ? 'selected'
                            : ''
                        }>
                        ${state.name}
                      </option>`
                  )
                  .join('\n')}
              </select>
            </div>
          </div>
          <div class="controlGroup">
            <button class="modalButton" onclick="cym.handleMobileRunFilter()">Update my results</button>
          </div>
        </div>
        <div class="closeMobileModal" onclick="cym.toggleMobileModal()">X</div>
      </div>
      </div>
  `
  document.body.append(mobileModal)
}

export function toggleMobileModal() {
  $('#mobileModalContainer').toggle()
}

$(document).ready(async () => {
  insertModal()
  insertMobileModalButton()
  $('#purchasOverlayPanel').hide()
  insertMobileModal()
  $('#mobileModalContainer').hide()
  waitFor('.dropdowns__container', async () => {
    insertLoanPurposeDropDown()
    insertCreditScoreDropDown()
    insertLoanAmountDropDown()
    insertLocationDropDown()
  })
})
