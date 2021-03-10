import axios from 'axios';
import $ from 'jquery'

function toggleDropDown(id, newText = null) {
  $(`${id} .dd_option`).toggle();
  if ($(`${id} .dd_option`).is(":visible")) {
    $(`${id} .arr`).css("transform", "rotate(-135deg)");
  } else {
    $(`${id} .arr`).css("transform", "rotate(45deg)");
  }
  if (newText) $(`${id} .dd__value`).text(newText);
}

export function insertLoanPurposeDropDown() {
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

export function insertCreditScoreDropDown() {
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

export function insertLoanAmountDropDown() {
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

export async function insertLocationDropDown() {
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

export function insertModal() {
  const purchaseModal = document.createElement("div");
  purchaseModal.id = "purchasOverlayPanel";
  purchaseModal.className = "dlpPanel";
  purchaseModal.innerHTML = `
  <div id="purchaseOverlayBgContainer" class="dlpPanel"></div>
  <div id="cymPurchaseOverlayDiv" class="dlpPanel">
    <div id="purchaseMainOverlayDiv" class="dlpPanel">
      <div id="headlinePurchaseDiv" class="dlpPanel">
        How soon are you looking to close?
      </div>
      <div id="purchaseOrderDiv" class="dlpPanel">
        <div id="verySoonDiv" class="dlpPanel" onclick="cym.handleModalButtonsClick('soon')">Very soon</div>
        <div id="notSoonDiv" class="dlpPanel" onclick="cym.handleModalButtonsClick('notSoon')">Not soon</div>
      </div>
      <div id="closePurchaseOverlayDiv" onclick="cym.handleModalButtonsClick('none')">X</div>
    </div>
  </div>
`;
  document.body.append(purchaseModal);
}


