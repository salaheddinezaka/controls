import { motion } from 'framer-motion'
import styled from 'styled-components'
import { above } from '../utils/media-query'

export const ModalBackground = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
`

export const SubmitSearchButton = styled.button`
  font-family: var(--lincxContentFont);
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.23px;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 19px 46px;
  background-color: var(--lincxPrimaryColor);
  cursor: pointer;
  margin-top: 16px;
  ${above.med`
    font-size: 24px;
    margin-top: 0;
    margin-left: 16px;
`}
`
