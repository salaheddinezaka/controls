import { css } from 'styled-components'

export const sizes = {
  tiny: 480,
  small: 768,
  med: 980,
  large: 1280
}

export const above = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const below = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const detectMobile = () =>
  window.innerWidth <= 800 && window.innerHeight <= 600
