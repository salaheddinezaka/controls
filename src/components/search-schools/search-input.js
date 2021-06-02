import React, { useEffect } from 'react'
import styled from 'styled-components'
import { getSelectedSchool } from '../../controls/student-loan-v2/helpers'
import {
  handleClearSearch,
  handleSearchValueChanged,
  handleSelectCollege
} from '../../controls/student-loan-v2/state/actions'
import { usePSLContext } from '../../controls/student-loan-v2/state/context'
import useFuzzySearch from '../../hooks/useFuzzySearch'
import { above, below } from '../../utils/media-query'
import colleges from '../../utils/schools.json'

const SuggestionItem = ({ collegeName, onClick }) => {
  return (
    <SuggestionItemStyle onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="417pt"
        viewBox="0 -46 417.81333 417"
        width="417pt"
        fill="currentColor"
        className="checked__icon"
      >
        <path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0" />
      </svg>
      <div>
        <span className="school__name">{collegeName}</span>
      </div>
    </SuggestionItemStyle>
  )
}

const SearchInput = ({ shouldSubmitOnSelect = false }) => {
  const {
    state: { searchValue, collegesSuggestions, showSuggestions },
    dispatch
  } = usePSLContext()

  useFuzzySearch(colleges, {
    keys: ['opeid', 'school_name', 'school_abv'],
    isCaseSensitive: false,
    minMatchCharLength: 2
  })

  useEffect(() => {
    const selectedSchool = getSelectedSchool()
    if (selectedSchool) {
      dispatch(handleSelectCollege(selectedSchool))
    }
  }, [])

  const handleSubmitOnSelect = (item) => {
    dispatch(handleSelectCollege(item))
    if (shouldSubmitOnSelect && window.renderAdFeed != undefined) {
      window.renderAdFeed({ 'data-school': item.opeid })
    }
  }

  const handleClearClick = () => {
    dispatch(handleClearSearch())
    if (
      window.renderAdFeed != undefined &&
      window.lincxDefaultValue !== 'none'
    ) {
      window.renderAdFeed({ 'data-school': window.lincxDefaultValue })
    }
  }

  return (
    <SearchInputContainer id="lincx-search-input" isMobile={window.lincxShowFormOnMobile}>
      <label htmlFor="search__input">College</label>
      <input
        type="text"
        placeholder="Enter your college name"
        value={searchValue}
        onChange={(val) => dispatch(handleSearchValueChanged(val.target.value))}
      />
      {searchValue && <ClearIcon onClick={handleClearClick}>x</ClearIcon>}
      {showSuggestions && (
        <SuggestionsList id="lincx__suggestion--list" isMobile={window.lincxShowFormOnMobile}>
          {collegesSuggestions.map(({ item }) => (
            <SuggestionItem
              key={item.opeid}
              collegeName={item.school_name}
              onClick={() => handleSubmitOnSelect(item)}
            />
          ))}
        </SuggestionsList>
      )}
    </SearchInputContainer>
  )
}

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  border: solid 1px #979797;
  border-radius: 4px;
  flex: 1;
  ${(props) =>
    props.isMobile &&
    below.small`
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  `}
  label {
    font-family: var(--lincxContentFont);
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #121212;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    z-index: 9;
    padding: 0 10px;
  }
  input {
    padding: 20px 20px;
    opacity: 0.8;
    font-family: var(--lincxContentFont);
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.09;
    letter-spacing: -0.21px;
    color: rgb(18, 18, 18);
    width: 100%;
    border: none;
    outline: none;
  }
  ${above.small`
    font-size: 22px;
  `}
`

const ClearIcon = styled.span`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.5;
  color: #141c1f;
`
const SuggestionsList = styled.ul`
  position: absolute;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgb(60 64 67 / 30%);
  background-color: #ffffff;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
  overflow-y: scroll;
  z-index: 999;
  bottom: 102%;
  max-height: 154px;
  ${above.small`
    top: 102%;
    max-height: 224px;
    bottom: auto;
  `}
  ${(props) =>
    props.isMobile &&
    below.small`
      top: 102%;
      bottom: auto;
  `}
`
const SuggestionItemStyle = styled.li`
  padding: 12px 0px;
  user-select: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  .checked__icon {
    color: transparent;
    position: initial;
    margin: 0 12px;
    height: 12px;
    width: 12px;
  }
  .school__name {
    display: block;
    opacity: 0.8;
    font-family: var(--lincxContentFont);
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.15px;
    color: #121212;
  }
  .school__adress {
    display: block;
    font-family: var(--lincxContentFont);
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.15px;
    color: #808080;
  }
  &:hover {
    background-color: #e8f0fe;
    .school__name,
    .school__adress {
      color: #1a73e8;
    }
    .checked__icon {
      color: #fbbc06;
    }
  }
`

export default SearchInput
