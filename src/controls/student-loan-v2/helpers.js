import colleges from '../../utils/schools.json'

export function insertParam(key, value) {
  key = encodeURIComponent(key)
  value = encodeURIComponent(value)
  var kvp = document.location.search.substr(1).split('&')
  let i = 0

  for (; i < kvp.length; i++) {
    if (kvp[i].startsWith(key + '=')) {
      let pair = kvp[i].split('=')
      pair[1] = value
      kvp[i] = pair.join('=')
      break
    }
  }

  if (i >= kvp.length) {
    kvp[kvp.length] = [key, value].join('=')
  }

  // can return this or...
  let params = kvp.join('&')
  // reload page with new params
  document.location = `${window.lincxSecondPage}?${params}`
}

export function getSelectedSchool() {
  const urlParams = new URLSearchParams(window.location.search)
  const selectedSchool = urlParams.get('lincx-school')
  if (!selectedSchool) return false
  return colleges.find((element) => element.opeid === selectedSchool)
}
