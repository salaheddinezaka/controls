import React from 'react'
import styled from 'styled-components'

const RefineResultsButton = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 477.867 477.867"
      >
        <path d="M460.8 221.867H185.31c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 238.934 17.07 17.07 0 0 0 17.067 256h36.557c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-341.333 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 51.2h-53.623c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 68.267a17.07 17.07 0 0 0 17.067 17.067H275.49c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067A17.07 17.07 0 0 0 460.8 51.2zm-119.466 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.282 34.133-34.133 34.133zM460.8 392.534h-87.757c-9.255-36.364-46.237-58.34-82.602-49.085-24.116 6.138-42.947 24.969-49.085 49.085H17.067A17.07 17.07 0 0 0 0 409.6a17.07 17.07 0 0 0 17.067 17.067h224.29c9.255 36.364 46.237 58.34 82.602 49.085 24.116-6.138 42.947-24.969 49.085-49.085H460.8a17.07 17.07 0 0 0 17.067-17.067 17.07 17.07 0 0 0-17.067-17.066zm-153.6 51.2c-18.851 0-34.133-15.282-34.133-34.133s15.282-34.133 34.133-34.133 34.133 15.282 34.133 34.133-15.281 34.133-34.133 34.133z" />
      </svg>
      <span>Refine Result</span>
    </StyledButton>
  )
}

const StyledButton = styled.button`
  border-radius: 30px;
  box-shadow: 0 1px 4px 0 rgb(60 64 67 / 36%);
  background-color: #0e1d31;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 22px;
  position: fixed;
  z-index: 8;
  bottom: 72px;
  border: none;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  outline: none;
  width: 70%;
  svg {
    height: 14px;
    margin-right: 10px;
  }
  span {
    font-family: Poppins;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.45;
    letter-spacing: normal;
  }
`
export default RefineResultsButton
