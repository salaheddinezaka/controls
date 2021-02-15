import { waitFor } from '../helpers'
import $ from 'jquery'
import './credit-score-styles.css'

let creditScore = ''
const zoneAttributes = {}
export function hideModal() {
  $('.scores__modal--background').first().hide()
  $('.scores__modal').first().hide()
}

function showModal() {
  $('.scores__modal--background').first().show()
  $('.scores__modal').first().slideDown()
}

function updateZoneAttribute(attribute, value) {
  zoneAttributes[attribute] = value
  zoneAttributes['data-ad-feed-count'] = '10'
  window.renderAdFeed(zoneAttributes)
  if (attribute === 'data-credit-score') {
    $('#credit-score-select').val(value)
  }
}

export function handleClick(attribute, value) {
  updateZoneAttribute(attribute, value)
  hideModal()
}

export function handleCreditScoreChange(e) {
  console.log(e.value)
  updateZoneAttribute('data-credit-score', e.value)
}

function createModal() {
  const modalDiv = document.createElement('div')
  modalDiv.id = 'modal'
  modalDiv.innerHTML = `<div class="scores__modal--background"></div>
      <div class="scores__modal" style="display: block; top: 50px; opacity: 1;">
        <svg viewBox="0 0 48 48" onclick="creditScore.hideModal()">
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
              onclick="creditScore.handleClick('data-credit-score', 'excellent')"
            >
              Excellent <span>(720-850)</span></button
            ><button
              class="modal__button"
              onclick="creditScore.handleClick('data-credit-score', 'good')"
            >
              Good <span>(690-719)</span></button
            ><button
              class="modal__button"
              onclick="creditScore.handleClick('data-credit-score', 'fair')"
            >
              Fair <span>(630-689)</span></button
            ><button
              class="modal__button"
              onclick="creditScore.handleClick('data-credit-score', 'poor')"
            >
              Poor <span>(350-629)</span>
            </button>
          </div>
        </div>
      </div>`
  document.body.appendChild(modalDiv)
}

function addDropDown() {
  const dropdown = document.createElement('div')
  dropdown.className = 'pages__navigator'
  dropdown.innerHTML = `
        <span>Credit Score</span>
        <select id="credit-score-select" onchange="creditScore.handleCreditScoreChange(this)">
          <option value="excellent">Excellent (720-850)</option>
          <option value="good">Good (690-719)</option>
          <option value="fair">Fair (630-689)</option>
          <option value="poor">Poor (350-629)</option>
        </select>
        `

  document.getElementById('dropdown-credit-score').appendChild(dropdown)
}

$(document).ready(() => {
  createModal()
  hideModal()
  waitFor('#dropdown-credit-score', () => {
    showModal()
    addDropDown()
  })
})

