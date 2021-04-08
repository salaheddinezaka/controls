import { motion } from 'framer-motion'
import styled from 'styled-components'

export const ModalBackground = styled(motion.div)`
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
`
