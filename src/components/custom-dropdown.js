import React, { useState } from 'react'

const CustomDropDown = ({
  label,
  options,
  selectedOption,
  handleOptionChanged
}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="loan__purpose--DD dropdown__column">
      <label htmlFor="loanPurpose">{label}</label>
      <div id="loanPurpose">
        <svg viewBox="0 0 41.999 41.999" xmlns="http://www.w3.org/2000/svg">
          <path d="M36.068 20.176l-29-20A1.005 1.005 0 006.035.114 1 1 0 005.5.999v40a1 1 0 00.535.886 1.01 1.01 0 00.465.114c.199 0 .397-.06.568-.177l29-20a1 1 0 000-1.646z" />
        </svg>
        <div
          className="dropdown"
          onClick={() => {
            setIsOpen(!isOpen)
            console.log('toggle Dropdown')
          }}
        >
          <span className="dropdown__value">{selectedOption.text}</span>
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown__options" id="purpose__options">
          {options.map((option) => (
            <li
              className="dropdown__option"
              data-value={option.value}
              onClick={handleOptionChanged}
            >
              {option.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CustomDropDown
