window.lincxControls_sendCustomEvent = async (eventName, zoneId) => {
  if (!eventName || !zoneId) return
  await fetch(
    `https://api.lincx.com/api/track?type=${eventName}&zoneId=${zoneId}`
  )
}
