import $ from 'jquery'
import { waitFor } from '../helpers'
import {
  insertCreditScoreDropDown,
  insertLoanAmountDropDown,
  insertLoanPurposeDropDown,
  insertLocationDropDown,
  insertModal
} from './dropdowns'
import { insertMobileModal, insertMobileModalButton } from './mobileModal'
import { addTrustPilot } from './trustPilot'

if (window.zoneAttributes === undefined) {
  window.zoneAttributes = {}
}

async function setZoneAttributes(attribute, value) {
  window.zoneAttributes[attribute] = value
}

export function updateZoneAttribute() {
  console.log(window.zoneAttributes)
  window.renderAdFeed(window.zoneAttributes)
  await addTrustPilot()
  await loadPoppups()
}

export function dropdownSelectHandler(attribute, value, textValue) {
  setZoneAttributes(attribute, value)
  if (value !== 'purchase') {
    setZoneAttributes('data-when', 'soon')
    updateZoneAttribute()
  }

  addTrustPilot()
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

export function handleModalButtonsClick(value) {
  setZoneAttributes('data-when', value)
  updateZoneAttribute()
  $('#purchasOverlayPanel').hide()
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
    default:
      break
  }
}

export function toggleMobileModal() {
  $('#mobileModalContainer').toggle()
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

export function handleMobileRunFilter() {
  const purposeValue = $('#loanPurpose').val()
  setZoneAttributes('data-loan-purpose', purposeValue)

  if (purposeValue === 'purchase') {
    const whenValue = $('#when').val()
    setZoneAttributes('data-when', whenValue)
  } else {
    setZoneAttributes('data-when', 'soon')
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

async function loadPoppups() {
  const checkExist = setInterval(async function () {
    if (
      document.querySelectorAll("._lincxReRenderSection_").length === 2
    ) {
      clearInterval(checkExist);
      $(".disclaimerPopup").map(async (idx, elem) => {
        if (elem.dataset.url !== undefined && elem.dataset.url !== "") {
          let value = "";
          if (elem.dataset.url.includes("amerisave")) {
            try {
              const res = await fetch(elem.dataset.url)
                .then((str) => str.text())
                .then((val) => $.parseXML(val));
              value = $(res).find("disclaimer").attr("short");
            } catch (error) {
              console.error(error);
            }
          }
          addDisclamerPoppup(elem, value);
        }
      });
    }
  }, 100);
}
function addDisclamerPoppup(elem, value) {
  if (value === '') return
  const randomId = '_' + Math.random().toString(36).substr(2, 9)
  $(elem).children('li').last().append(`
      <div class="tooltip">
        <input type="checkbox" id="poppup${randomId}" class="tooltip__checkbox" />
        <label class="tooltip__icon" for="poppup${randomId}">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:v="https://vecta.io/nano" viewBox="0 0 330 330" fill="currentColor"><path d="M165 0C74.019 0 0 74.02 0 165.001S74.019 330 165 330s165-74.018 165-164.999S255.981 0 165 0zm0 300c-74.44 0-135-60.56-135-134.999S90.56 30 165 30s135 60.562 135 135.001S239.439 300 165 300zm-.002-230c-11.026 0-19.996 8.976-19.996 20.009 0 11.023 8.97 19.991 19.996 19.991s19.996-8.968 19.996-19.991c0-11.033-8.97-20.009-19.996-20.009zm.002 70c-8.284 0-15 6.716-15 15v90c0 8.284 6.716 15 15 15s15-6.716 15-15v-90c0-8.284-6.716-15-15-15z"/></svg>
        </label>
        <div class="popuptext">
          ${value}
        </div>
      </div>
      `)
}

waitFor('._lincxReRenderSection_', async () => {
  insertLoanPurposeDropDown()
  insertCreditScoreDropDown()
  insertLoanAmountDropDown()
  insertModal()
  $('#purchasOverlayPanel').hide()
  insertLocationDropDown()
  insertMobileModalButton()
  insertMobileModal()
  $('#mobileModalContainer').hide()

  addTrustPilot()
  loadPoppups()
})
