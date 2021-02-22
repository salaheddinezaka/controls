import $ from 'jquery'
import anime from 'animejs'
import { waitFor } from '../helpers'

import './style.css'

// let zoneAttributes = {}

// let purchaseTemplateId = document.currentScript.attributes('purchase-template')
// let equityTemplateId = document.currentScript.attributes('equity-template')
// let refiTemplateId = document.currentScript.attributes('refi-template')

var zoneAttributes
var purchaseTemplateId = '268ab7'
var equityTemplateId = 'hq7xwz'
var refiTemplateId = 'l1ai94'
if (typeof zoneAttributes === 'undefined') zoneAttributes = {}

function waitFor(element, callback) {
  const checkExist = setInterval(function () {
    if (document.querySelector(element)) {
      callback()
      clearInterval(checkExist)
    }
  }, 100)
}

function updateZoneAttribute(attribute, value) {
  zoneAttributes[attribute] = value
  zoneAttributes['data-ad-feed-count'] = '10'
  console.log({ zoneAttributes })
  window.renderAdFeed(zoneAttributes)
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
          <select id="purpose" onchange="handleChangeLoanPurpose(this)">
            <option value="none">Select your option</option>
            <option value="${purchaseTemplateId}">Purchase</option>
            <option value="${refiTemplateId}">Refinance</option>
            <option value="${equityTemplateId}">Home Equity</option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

function createCredirScoreDropDown() {
  const dropdownsContainer = document.getElementById('control__dropdowns')
  const dropdown = document.createElement('div')
  dropdown.innerHTML = `
          <span>Credit Score</span>
          <select id="credit-score" onchange="handleChangeCredirScore(this)">
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
          <select id="credit-score" onchange="handleChangeLoanAmount(this)">
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
          <select id="credit-score" onchange="handleChangeClosingSoon(this)">
            <option value="none">Select your option</option>
            <option value="as-soon-as-possible">As soon as possible</option>
            <option value="few-months">Within a few months</option>
            <option value="looking-around">Just looking around</option>
          </select>
        `
  dropdownsContainer.appendChild(dropdown)
}

function handleChangeLoanPurpose(e) {
  updateZoneAttribute('data-template-id', e.value)
}

function handleChangeCredirScore(e) {
  updateZoneAttribute('data-credit-score', e.value)
}

function handleChangeLoanAmount(e) {
  updateZoneAttribute('data-loan-amount', e.value)
}

function handleChangeClosingSoon(e) {
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

function closeStep1Modal() {
  hideModal('#modal__step1')
}

function closeStep2Modal() {
  hideModal('#modal__step2')
}

function insertStep1Modal() {
  const step1ModalContainer = document.createElement('div')
  step1ModalContainer.id = 'modal__step1'
  step1ModalContainer.innerHTML = `
          <div class="scores__modal--background"></div>
          <div class="scores__modal" style="display: block; top: 50px; opacity: 1;">
            <svg viewBox="0 0 48 48" onclick="closeStep1Modal()">
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
                  onclick="moveToNextModal()"
                >
                Purchase</button
                ><button
                  class="modal__button"
                  onclick="handleModalCLick('data-template-id', '${refiTemplateId}')"
                >
                Refinance</button
                ><button
                  class="modal__button"
                  onclick="handleModalCLick('data-template-id', '${equityTemplateId}')"
                >
                Home Equity</button
                >
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
            <svg viewBox="0 0 48 48" onclick="closeStep2Modal()">
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
                    src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/0EF884D8-EB9B-455F-A7F9-F3B2A799E582.png"
                    alt="credit score"
                  />
                </div>
              </div>
              <div class="modal__buttons">
                <button
                  class="modal__button"
                  onclick="handleSecondModalClick('as-soon-as-possible')"
                >
                As soon as possible</button
                ><button
                  class="modal__button"
                  onclick="handleSecondModalClick('few-months')"
                >
                Within a few months</button
                ><button
                  class="modal__button"
                  onclick="handleSecondModalClick('looking-around')"
                >
                Just looking around</button
                >
              </div>
            </div>
          </div>
        `
  document.body.appendChild(step2ModalContainer)
}

function moveToNextModal() {
  hideModal('#modal__step1')
  showModal('#modal__step2')
  animateModal('.scores__modal2')
}

function handleModalCLick(attribute, value) {
  updateZoneAttribute(attribute, value)
}

function handleSecondModalClick(value) {
  zoneAttributes['data-template-id'] = purchaseTemplateId
  zoneAttributes['data-when'] = value
  zoneAttributes['data-ad-feed-count'] = '10'
  console.log({ zoneAttributes })
  window.renderAdFeed(zoneAttributes)
  hideModal('#modal__step2')
}

$(document).ready(() => {
  insertStep1Modal()
  insertStep2Modal()
  hideModal('#modal__step1')
  hideModal('#modal__step2')
  waitFor('#control__dropdowns', () => {
    addControlTitle()
    createLoanPurposeDropDown()
    createCredirScoreDropDown()
    createLoanAmountDropDown()
    createWhenDropDown()
    showModal('#modal__step1')
    animateModal('.scores__modal')
  })
})
