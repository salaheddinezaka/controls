import $ from 'jquery'
import anime from 'animejs'
import { waitFor } from '../helpers'

import './style.css'

console.log({ attr: document.currentScript.getAttribute('data-purchase-id') })

if (window.zoneAttributes === undefined) {
  window.zoneAttributes = {}
}

if (window.selectedTemplate === undefined) {
  window.selectedTemplate =
    document.currentScript.getAttribute('data-current-page') || 'purchase'
}

if (window.templatesIds === undefined) {
  window.templatesIds = {
    purchase:
      document.currentScript.getAttribute('data-purchase-id') || '268ab7',
    equity: document.currentScript.getAttribute('data-equity-id') || 'hq7xwz',
    refi: document.currentScript.getAttribute('data-refi-id') || 'l1ai94'
  }
}

function updateZoneAttribute(attribute, value) {
  window.zoneAttributes[attribute] = value
  window.zoneAttributes['data-ad-feed-count'] = '10'
  console.log({ attr: window.zoneAttributes })
  window.renderAdFeed(window.zoneAttributes)
}

function addControlTitle() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const title = document.createElement('h3')
  title.innerHTML = `Which mortgage lender is right for you?`
  dropdownsContainer.appendChild(title)
}

function createLoanPurposeDropDown() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const dropdown = document.createElement('div')
  dropdown.innerHTML = `
          <span>Loan Purpose</span>
          <select id="purpose" onchange="mortgage.handleChangeLoanPurpose(this)">
            <option value="none">Select your option</option>
            <option value="${window.templatesIds.purchase}">Purchase</option>
            <option value="${window.templatesIds.refi}">Refinance</option>
            <option value="${window.templatesIds.equity}">Home Equity</option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

function createCredirScoreDropDown() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const dropdown = document.createElement('div')
  dropdown.innerHTML = `
          <span>Credit Score</span>
          <select id="credit-score" onchange="mortgage.handleChangeCredirScore(this)">
            <option value="none">Select your option</option>
            <option value="excellent">Excellent (720-850)</option>
            <option value="good">Good (690-719)</option>
            <option value="fair">Fair (630-689)</option>
            <option value="poor">Poor (350-629) </option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

function createLoanAmountDropDown() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const dropdown = document.createElement('div')
  dropdown.innerHTML = `
          <span>Loan Amount</span>
          <select id="loan-amount" onchange="mortgage.handleChangeLoanAmount(this)">
            <option value="none">Select your option</option>
            <option value="100">Up to $100K</option>
            <option value="100-250">$100K-$250K</option>
            <option value="250-400">$250K-$400K</option>
            <option value="400">$400K and up</option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

function createWhenDropDown() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const dropdown = document.createElement('div')
  dropdown.innerHTML = `
          <span>Closing soon?</span>
          <select id="when" onchange="mortgage.handleChangeClosingSoon(this)">
            <option value="none">Select your option</option>
            <option value="as-soon-as-possible">As soon as possible</option>
            <option value="few-months">Within a few months</option>
            <option value="looking-around">Just looking around</option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

export function handleChangeLoanPurpose(e) {
  updateZoneAttribute('data-template-id', e.value)
}

export function handleChangeCredirScore(e) {
  updateZoneAttribute('data-credit-score', e.value)
}

export function handleChangeLoanAmount(e) {
  updateZoneAttribute('data-loan-amount', e.value)
}

export function handleChangeClosingSoon(e) {
  updateZoneAttribute('data-when', e.value)
}

function hideModal(element) {
  $(element).first().hide()
}
function showModal(element) {
  $(element).first().show()
}
function animateModal(target) {
  anime({
    targets: target,
    top: 100,
    duration: 1000
  })
}

export function closeStep1Modal() {
  hideModal('#modal__step1')
  window.DisplayModal = false
}

export function closeStep2Modal() {
  hideModal('#modal__step2')
  window.DisplayModal = false
}

export function closeCreditScoreModal() {
  hideModal('#creditScore')
  window.DisplayModal = false
}

function insertStep1Modal() {
  const step1ModalContainer = document.createElement('div')
  step1ModalContainer.id = 'modal__step1'
  step1ModalContainer.innerHTML = `
          <div class="scores__modal--background"></div>
          <div class="scores__modal" style="display: block; top: 50px; opacity: 1;">
            <svg viewBox="0 0 48 48" onclick="mortgage.closeStep1Modal()">
              <g fill-rule="evenodd">
                <path
                  d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"
                ></path>
                <path
                  d="M24.34 22.22l-7.775-7.775a1.5 1.5 0 1 0-2.12 2.12l7.773 7.775-7.774 7.775a1.5 1.5 0 1 0 2.12 2.12l7.775-7.773 7.774 7.774a1.5 1.5 0 1 0 2.12-2.12L26.46 24.34l7.774-7.774a1.5 1.5 0 1 0-2.12-2.12l-7.776 7.773z"
                ></path>
              </g>
            </svg>
            <div class="modal__info">
              <div class="modal__header">
                <div class="modal__title">
                  What type of mortgage are you looking for?
                </div>
                <div>
                  <img
                    src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/2D708EBB-2086-44D5-BB65-834E59EA227D.png"
                    alt="credit score"
                  />
                </div>
              </div>
              <div class="modal__buttons">
                <button
                  class="modal__button"
                  onclick="mortgage.moveToNextModal()"
                >
                Purchase</button
                ><button
                  class="modal__button"
                  onclick="mortgage.moveToCreditScoreModal('${window.templatesIds.refi}')"
                >
                Refinance</button
                ><button
                  class="modal__button"
                  onclick="mortgage.moveToCreditScoreModal('${window.templatesIds.equity}')"
                >
                Home Equity</button
                >
              </div>
              <div class="modal__steps">
                <ul>
                  <li class="completed"></li>
                  <li class="incompleted"></li>
                </ul>
                <span>1/2 Steps</span>
              </div>
            </div>
          </div>
        `

  document.body.appendChild(step1ModalContainer)
}

function insertStep2Modal() {
  const step2ModalContainer = document.createElement('div')
  step2ModalContainer.id = 'modal__step2'
  step2ModalContainer.innerHTML = `
          <div class="scores__modal--background"></div>
          <div class="scores__modal2" style="display: block; top: 50px; opacity: 1;">
            <svg viewBox="0 0 48 48" onclick="mortgage.closeStep2Modal()">
              <g fill-rule="evenodd">
                <path
                  d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"
                ></path>
                <path
                  d="M24.34 22.22l-7.775-7.775a1.5 1.5 0 1 0-2.12 2.12l7.773 7.775-7.774 7.775a1.5 1.5 0 1 0 2.12 2.12l7.775-7.773 7.774 7.774a1.5 1.5 0 1 0 2.12-2.12L26.46 24.34l7.774-7.774a1.5 1.5 0 1 0-2.12-2.12l-7.776 7.773z"
                ></path>
              </g>
            </svg>
            <svg class="back" onclick="mortgage.moveBack()" xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 31.494 31.494"><path d="M10.273 5.009a1.11 1.11 0 0 1 1.587 0 1.12 1.12 0 0 1 0 1.571l-8.047 8.047h26.554c.619 0 1.127.492 1.127 1.111a1.13 1.13 0 0 1-1.127 1.127H3.813l8.047 8.032a1.14 1.14 0 0 1 0 1.587 1.11 1.11 0 0 1-1.587 0L.321 16.532a1.12 1.12 0 0 1 0-1.571l9.952-9.952z" fill="currentColor"/></svg>
            <div class="modal__info">
              <div class="modal__header">
                <div class="modal__title">
                  What type of mortgage are you looking for?
                </div>
                <div>
                  <img
                    src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/0EF884D8-EB9B-455F-A7F9-F3B2A799E582.png"
                    alt="credit score"
                  />
                </div>
              </div>
              <div class="modal__buttons">
                <button
                  class="modal__button"
                  onclick="mortgage.handleSecondModalClick('as-soon-as-possible')"
                >
                As soon as possible</button
                ><button
                  class="modal__button"
                  onclick="mortgage.handleSecondModalClick('few-months')"
                >
                Within a few months</button
                ><button
                  class="modal__button"
                  onclick="mortgage.handleSecondModalClick('looking-around')"
                >
                Just looking around</button
                >
              </div>
              <div class="modal__steps">
                <ul>
                  <li class="completed"></li>
                  <li class="completed"></li>
                </ul>
                <span>1/2 Steps</span>
              </div>
            </div>
          </div>
        `
  document.body.appendChild(step2ModalContainer)
}

function insertCreditScoreModal() {
  const modalDiv = document.createElement('div')
  modalDiv.id = 'creditScoreModal'
  modalDiv.innerHTML = `<div class="scores__modal--background"></div>
      <div class="scores__modal--3" style="display: block; top: 50px; opacity: 1;">
        <svg viewBox="0 0 48 48" onclick="mortgage.closeCreditScoreModal()">
          <g fill-rule="evenodd">
            <path
              d="M24 48c13.255 0 24-10.745 24-24S37.255 0 24 0 0 10.745 0 24s10.745 24 24 24zm0-3c11.598 0 21-9.402 21-21S35.598 3 24 3 3 12.402 3 24s9.402 21 21 21z"
            ></path>
            <path
              d="M24.34 22.22l-7.775-7.775a1.5 1.5 0 1 0-2.12 2.12l7.773 7.775-7.774 7.775a1.5 1.5 0 1 0 2.12 2.12l7.775-7.773 7.774 7.774a1.5 1.5 0 1 0 2.12-2.12L26.46 24.34l7.774-7.774a1.5 1.5 0 1 0-2.12-2.12l-7.776 7.773z"
            ></path>
          </g>
        </svg>
        <svg class="back" onclick="mortgage.moveBack(false)" xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 31.494 31.494"><path d="M10.273 5.009a1.11 1.11 0 0 1 1.587 0 1.12 1.12 0 0 1 0 1.571l-8.047 8.047h26.554c.619 0 1.127.492 1.127 1.111a1.13 1.13 0 0 1-1.127 1.127H3.813l8.047 8.032a1.14 1.14 0 0 1 0 1.587 1.11 1.11 0 0 1-1.587 0L.321 16.532a1.12 1.12 0 0 1 0-1.571l9.952-9.952z" fill="currentColor"/></svg>
        <div class="modal__info">
          <div class="modal__header">
            <div class="modal__title">What is your credit score?</div>
            <div>
              <img
                src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/C9A3EE51-8117-4B8C-886B-7D285BF3F34B.png"
                alt="credit score"
              />
            </div>
          </div>
          <div class="modal__buttons">
            <button
              class="modal__button"
              onclick="mortgage.handleCreditScoreModalClick('excellent')"
            >
              Excellent <span>(720-850)</span></button
            ><button
              class="modal__button"
              onclick="mortgage.handleCreditScoreModalClick('good')"
            >
              Good <span>(690-719)</span></button
            ><button
              class="modal__button"
              onclick="mortgage.handleCreditScoreModalClick('fair')"
            >
              Fair <span>(630-689)</span></button
            ><button
              class="modal__button"
              onclick="mortgage.handleCreditScoreModalClick('poor')"
            >
              Poor <span>(350-629)</span>
            </button>
          </div>
          <div class="modal__steps">
            <ul>
              <li class="completed"></li>
              <li class="completed"></li>
            </ul>
            <span>1/2 Steps</span>
          </div>
        </div>
      </div>`
  document.body.appendChild(modalDiv)
}

export function moveToNextModal() {
  hideModal('#modal__step1')
  showModal('#modal__step2')
  animateModal('.scores__modal2')
}

export function moveToCreditScoreModal(templateId) {
  hideModal('#modal__step1')
  showModal('#creditScoreModal')
  animateModal('.scores__modal--3')
  window.zoneAttributes['data-template-id'] = templateId;
}

export function moveBack(fromWhen = true) {
  fromWhen ? hideModal('#modal__step2') : hideModal('#creditScoreModal')
  showModal('#modal__step1')
  animateModal('.scores__modal1')
}

export function handleModalCLick(attribute, value) {
  updateZoneAttribute(attribute, value)
  $(`#purpose`).val(value)
  hideModal('#modal__step1')
  window.DisplayModal = false
}

export function TabsClick(purpose){
  updateZoneAttribute("data-template-id", purpose)
  return false;
}

export function handleSecondModalClick(value) {
  window.zoneAttributes['data-template-id'] = window.templatesIds.purchase
  window.zoneAttributes['data-when'] = value
  window.renderAdFeed(window.zoneAttributes)
  $(`#purpose`).val(window.templatesIds.purchase)
  $('#when').val(value)
  hideModal('#modal__step2')
  window.DisplayModal = false
}

export function handleCreditScoreModalClick(value){
  window.zoneAttributes['data-credit-score'] = value
  window.renderAdFeed(window.zoneAttributes)
  $(`#purpose`).val(window.zoneAttributes['data-template-id'])
  $('#credit-score').val(value)
  hideModal('#creditScoreModal')
  window.DisplayModal = false
}
function canShowModal() {
  if (window.DisplayModal === undefined) {
    window.DisplayModal = true
    return true
  } else {
    return window.DisplayModal
  }
}

function loadCurrentZoneAttribute() {
  if (window.zoneAttributes === undefined) return
  if (window.zoneAttributes.hasOwnProperty('data-template-id'))
    $(`#purpose`).val(window.zoneAttributes['data-template-id'])
  if (window.zoneAttributes.hasOwnProperty('data-when'))
    $(`#when`).val(window.zoneAttributes['data-when'])
  if (window.zoneAttributes.hasOwnProperty('data-credit-score'))
    $(`#credit-score`).val(window.zoneAttributes['data-credit-score'])
  if (window.zoneAttributes.hasOwnProperty('data-loan-amount'))
    $(`#loan-amount`).val(window.zoneAttributes['data-loan-amount'])
}

$(document).ready(() => {
  insertStep1Modal()
  insertStep2Modal()
  insertCreditScoreModal()
  hideModal('#modal__step1')
  hideModal('#modal__step2')
  hideModal('#creditScoreModal')
  waitFor('#control__dropdowns', () => {
    addControlTitle()
    createLoanPurposeDropDown()
    createCredirScoreDropDown()
    createLoanAmountDropDown()
    if (window.selectedTemplate === 'purchase') {
      createWhenDropDown()
    }
    loadCurrentZoneAttribute()
    if (canShowModal()) {
      showModal('#modal__step1')
      animateModal('.scores__modal')
    }else{
      hideModal('#modal__step1')
      hideModal('#modal__step2')
      hideModal('#creditScoreModal')
    }
  })
})
