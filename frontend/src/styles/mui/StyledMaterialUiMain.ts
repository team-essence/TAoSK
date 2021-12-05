import { calculateMinNegativeSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { styled } from '@mui/material/styles'

export const StyledMaterialUiMain = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: calculateMinNegativeSizeBasedOnFigmaWidth(210),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))
