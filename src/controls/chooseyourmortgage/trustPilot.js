async function loadStars() {
  const res = await Promise.all(
    [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((starScore) =>
      fetch(
        `https://api.trustpilot.com/v1/resources/images/stars/${starScore}?apikey=uNyxSr60jGX15CkwVZq442eSdfWzMmgo`
      ).then((resp) => resp.json())
    )
  )
  return arrayToObject(res, 'stars')
}

const arrayToObject = (array, attrName) =>
  array.reduce((obj, item) => {
    obj[item[attrName]] = item
    return obj
  }, {})

async function getAllTrustKeys() {
  const businessUnitIds = {}
  $('.trustContainer').map((idx, elem) => {
    if (!businessUnitIds[elem.dataset.key])
      businessUnitIds[elem.dataset.key] = ''
  })

  const data = await Promise.all(
    Object.keys(businessUnitIds).map((unitId) =>
      fetch(
        `https://api.trustpilot.com/v1/business-units/${unitId}?apikey=uNyxSr60jGX15CkwVZq442eSdfWzMmgo`
      ).then((resp) => resp.json())
    )
  )
  data.map((val) => {
    businessUnitIds[val.id] = val
  })
  return businessUnitIds
}

function setTrustPilot(business, stars, elem) {
  const businessKey = business[elem.dataset.key]
  const starsScore = businessKey.score.stars
  if (businessKey.numberOfReviews.total === 0) {
    insertNoReviews(elem)
    return
  }
  const excellentPercentage = Math.round(
    (businessKey.numberOfReviews.fiveStars /
      businessKey.numberOfReviews.total) *
      100
  ).toFixed(0)
  const greatPercentage = Math.round(
    (businessKey.numberOfReviews.fourStars /
      businessKey.numberOfReviews.total) *
      100
  ).toFixed(0)
  const averagePercentage = Math.round(
    (businessKey.numberOfReviews.threeStars /
      businessKey.numberOfReviews.total) *
      100
  ).toFixed(0)
  const poorPercentage = Math.round(
    (businessKey.numberOfReviews.twoStars / businessKey.numberOfReviews.total) *
      100
  ).toFixed(0)
  const badPercentage = Math.round(
    (businessKey.numberOfReviews.oneStar / businessKey.numberOfReviews.total) *
      100
  ).toFixed(0)
  elem.innerHTML = `
    <div id="ratingContainer" class="ratingContainer">
      <div class="rating">
        <a class="starimg">
          <img class="starRating" src="${
            stars[businessKey.score.stars].star128x24.url
          }">
        </a>
      </div>
      <div id="trustText">
        <span id="noofReviews">${
          businessKey.numberOfReviews.total
        }</span> Reviews On
        <div id="trustImage">
          <img alt="trust Logo" id="trustImg" src="/logo-black.png" />
        </div>
      </div>
    </div>
    <div class="rate-breakdown">
      <div class="container">
        <span class="reviewText">Excellent</span>
        <div class="progress2 progress-moved">
          <div class="progress-bar2" id="excellent" style="width: ${excellentPercentage}%;"></div>
        </div>
        <span class="reviewPercentage" id="exePer">
          ${excellentPercentage}%
        </span>
      </div>
      <div class="container">
        <span class="reviewText">Great</span>
        <div class="progress2 progress-moved">
          <div class="progress-bar2" id="great" style="width: ${greatPercentage}%;"></div>
        </div>
        <span class="reviewPercentage" id="greatPer">
            ${greatPercentage}%
        </span>
      </div>
      <div class="container">
        <span class="reviewText">Average</span>
        <div class="progress2 progress-moved">
          <div class="progress-bar2" id="avg" style="width: ${averagePercentage}%;"></div>
        </div>
        <span class="reviewPercentage" id="avgPer">
            ${averagePercentage}%
        </span>
      </div>
      <div class="container">
        <span class="reviewText">Poor</span>
        <div class="progress2 progress-moved">
          <div class="progress-bar2" id="poor" style="width: ${poorPercentage}% ;"></div>
        </div>
        <span class="reviewPercentage" id="poorPer">
            ${poorPercentage}%
        </span>
      </div>
      <div class="container">
        <span class="reviewText">Bad</span>
        <div class="progress2 progress-moved">
          <div class="progress-bar2" id="bad" style="width: ${badPercentage}% ;"></div>
        </div>
        <span class="reviewPercentage" id="badPer">
            ${badPercentage}%
        </span>
      </div>
      <div class="totalreviews">
        <a
          class="review-link"
          href="https://www.trustpilot.com/review/${
            businessKey.name.identifying
          }"
          target="_blank"
          data-track="quicken_trstrev_link"
        >
          See all <span class="totalR">${
            businessKey.numberOfReviews.total
          }</span> reviews →</a
        >
      </div>
    </div>`
}

function insertNoReviews(elem) {
  elem.innerHTML = `
    <div id="ratingContainer" class="ratingContainer">
      <div id="trustText">
        <span id="noofReviews">No</span> Reviews On
        <div id="trustImage">
          <img alt="trust Logo" id="trustImg" src="/logo-black.png" />
        </div>
      </div>
    </div>
    `
}

export async function addTrustPilot() {
  const checkExist = setInterval(async function () {
    if (document.querySelectorAll('._lincxReRenderSection_').length === 2) {
      clearInterval(checkExist)
      const business = await getAllTrustKeys()
      const stars = await loadStars()
      $('.trustContainer').map((_, elem) => {
        if (elem.dataset.key !== '') {
          setTrustPilot(business, stars, elem)
        } else {
          insertNoReviews(elem)
        }
      })
    }
  }, 100)
}
