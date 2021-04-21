import React, { useState } from 'react'
import styled from 'styled-components'

const CustomDropDown = ({
  id,
  label,
  options,
  selectedOption,
  handleOptionChanged,
  selectionType
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DropDownContainer
      className="dropdown__element"
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      <DropDownLabel htmlFor={id}>{label}</DropDownLabel>
      <DropDownValueContainer id={id}>
        <svg viewBox="0 0 41.999 41.999" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.068 20.176l-29-20A1.005 1.005 0 006.035.114 1 1 0 005.5.999v40a1 1 0 00.535.886 1.01 1.01 0 00.465.114c.199 0 .397-.06.568-.177l29-20a1 1 0 000-1.646z" />
        </svg>
        <span>{selectedOption.text}</span>
      </DropDownValueContainer>
      {isOpen && (
        <DropDownOptions>
          {options.map((option) => (
            <DropDownOption
              onClick={() => {
                handleOptionChanged(selectionType, option)
              }}
              selected={option.value === selectedOption.value}
              key={option.value}
            >
              {option.value === selectedOption.value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="417pt"
                  viewBox="0 -46 417.81333 417"
                  width="417pt"
                  fill="currentColor"
                >
                  <path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0" />
                </svg>
              )}
              {option.text}
            </DropDownOption>
          ))}
        </DropDownOptions>
      )}
    </DropDownContainer>
  )
}

const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #9797976c;
  border-radius: 5px;
  padding: 10px 13px;
  padding-bottom: 12px;
  flex: 1;
  position: relative;
  min-height: 56px;
  max-height: 56px;
  cursor: pointer;
  box-sizing: border-box;
  justify-content: center;
`

const DropDownLabel = styled.label`
  position: absolute;
  top: 0;
  left: 13px;
  transform: translateY(-50%);
  background: #fff;
  padding: 0 3px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: grey;
`

const DropDownValueContainer = styled.div`
  span {
    font-family: Roboto;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.15px;
    color: #000000;
  }
  svg {
    width: 10px;
    color: #979797;
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
  }
`

const DropDownOptions = styled.ul`
  position: absolute;
  left: 0;
  top: calc(100% + 2px);
  width: 100%;
  box-shadow: 0 1px 4px 0 rgb(60 64 67 / 30%);
  background: #fff;
  z-index: 10;
  border-radius: 4px;
  overflow: hidden;
  max-height: 350px;
  overflow-y: scroll;
`

const DropDownOption = styled.li`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.15px;
  color: #000000;
  min-height: 72px;
  display: flex;
  align-items: center;
  padding-left: ${(props) => (props.selected ? '0px' : '38px')};
  &:hover {
    background-color: #e8f0fe;
    color: #1a73e8;
  }
  svg {
    width: 18px;
    height: 15px;
    margin: 0 10px;
    color: #fbbc06;
  }
`

export default CustomDropDown
