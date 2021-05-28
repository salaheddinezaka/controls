export function setupPLSControls() {
  const containerDataSet = document.getElementById(
    'search-schools-control'
  ).dataset
  setupCTAText(containerDataSet)
  setupShouldShowModal(containerDataSet)
  setupDefaultValueForLincxZone(containerDataSet)
  setupMainImage(containerDataSet)
  setupDesktopCTASearch(containerDataSet)
  setupSecondPage(containerDataSet)
}

function setupCTAText(dataset) {
  window.searchButtonText = dataset.searchButtonText || 'Find Loans'
}

function setupShouldShowModal(dataset) {
  if (dataset.showModal && dataset.showModal === 'false')
    window.lincxShowModal = false
  else window.lincxShowModal = true
  if (dataset.defaultValue !== undefined) {
    window.lincxDefaultValue = dataset.defaultValue
  }
}

function setupDefaultValueForLincxZone(dataset) {
  if (dataset.defaultValue !== undefined && dataset.defaultValue === '') {
    window.lincxDefaultValue = ''
  }

  if (dataset.defaultValue === undefined) {
    window.lincxDefaultValue = 'default'
  }
}

function setupMainImage(dataset) {
  window.lincxMainIcon =
    dataset.mainIcon ||
    'https://cdn.zeplin.io/5fb6b6e30914549574b7eeee/assets/9591DAD2-597C-46C4-8824-745D5F1E7B82.png'
}

function setupDesktopCTASearch(dataset) {
  window.lincxDesktopCTA = dataset.desktopCta || false
}

function setupSecondPage(dataset) {
  window.lincxSecondPage = dataset.secondPage || false
}
