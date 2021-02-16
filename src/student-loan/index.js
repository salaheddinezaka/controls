import $ from 'jquery'
import { colleges } from './schools'
import Autocomplete from '@trevoreyre/autocomplete-js'
import "./style.css"

const zoneAttributes = {}


function insertModalIntoPage() {
  const modalElement = document.createElement('div')
  modalElement.id = 'modal'
  modalElement.innerHTML = `
  <div class="scores__modal--background"></div>
  <div class="scores__modal" style="display: block; top: 50px; opacity: 1;">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="329pt"
      viewBox="0 0 329.26933 329"
      width="329pt"
      onclick="hideModal()"
    >
      <path
        d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"
      />
    </svg>
    <div class="modal__info">
      <div class="modal__header">
        <div class="modal__title">Which college will you be attending?</div>
        <img
          src="https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/CB1DF7C0-4276-47C2-8E7C-A7BAF5F76F9C.png"
          alt="credit score"
        />
      </div>
      <div class="modal__form">
        <div class="modal__input" id="autocomplete">
          <input
            class="autocomplete-input"
            type="text"
            placeholder="Enter your college name"
			id="modal-search-input"
          />
          <ul class="autocomplete-result-list suggestions__list"></ul>
        </div>
        <button class="loan__button" onclick="handleModalSubmit()">FIND LOANS</button>
      </div>
    </div>
  </div>`
  document.body.appendChild(modalElement)
}

export function hideModal() {
  $('.scores__modal--background').first().hide()
  $('.scores__modal').first().hide()
}

function showModal() {
  $('.scores__modal--background').first().show()
  $('.scores__modal').first().slideDown()
}

function addAutoComplete(element) {
  // #autocomplete
  new Autocomplete(element, {
    search: (input) => {
      if (input.length < 1) {
        return []
      }
      return colleges.filter((college) => {
        return college.school_name.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    onSubmit: (result) => {
      $('#selectedSchool').val(result.opeid)
    },
    getResultValue: (result) => result.school_name,
    renderResult: (result, props) => `
    <div class="suggestion__item" ${props}>
      <span class="college__name"
        >${result.school_name}</span
      >
    </div>
    `
  })
}

function updateZoneAttribute(attribute, value) {
  zoneAttributes[attribute] = value
  zoneAttributes['data-ad-feed-count'] = '10'
  console.log({ zoneAttributes })
  console.log({ attribute })
  console.log({ value })
  window.renderAdFeed(zoneAttributes)
}

export function handleModalSubmit() {
  updateZoneAttribute('data-school', $('#selectedSchool').val())
  hideModal()
}

export function handleSearchSubmit() {
  updateZoneAttribute('data-school', $('#selectedSchool').val())
}

function insertHiddenInput() {
  const selectedSchoolInput = document.createElement('input')
  selectedSchoolInput.type = 'hidden'
  selectedSchoolInput.id = 'selectedSchool'
  document.body.appendChild(selectedSchoolInput)
}

function createSearchInput() {
  document.getElementById('search-schools-control').innerHTML = `
    <div class="search__control--container">
    <h3>Which college will you be attending?</h3>
    <div class="control__form">
      <div class="control__input" id="autocomplete__input">
        <input
          class="autocomplete-input"
          type="text"
          placeholder="Enter your college name"
        />
        <ul class="autocomplete-result-list suggestions__list"></ul>
      </div>
      <button class="search__button" onclick="handleSearchSubmit()">FIND LOANS</button>
    </div>
  </div>
  `
}

function makeSearchFixedOnScroll() {
  const searchContainerTop = document.getElementById('search-schools-control')
    .offsetTop
  $(window).scroll(() => {
    const currentScroll = $(window).scrollTop()
    if (currentScroll >= searchContainerTop) {
      $('#search-schools-control').css({
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        'z-index': 1
      })
    } else {
      $('#search-schools-control').css({
        position: 'static'
      })
    }
  })
}

function waitFor(element, callback) {
  const checkExist = setInterval(function () {
    if (document.querySelector(element)) {
      callback()
      clearInterval(checkExist)
    }
  }, 100)
}

$(document).ready(function () {
  insertModalIntoPage()
  hideModal()
  waitFor('#search-schools-control', async () => {
    createSearchInput()
    showModal()
    insertHiddenInput()
    addAutoComplete('#autocomplete')
    addAutoComplete('#autocomplete__input')
    makeSearchFixedOnScroll()
  })
})
