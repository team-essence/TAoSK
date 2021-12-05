import { styled } from '@mui/material/styles'

type pxStr = `${number}px`
const FIGMA_WIDTH_PX = 1440
const a = (px: number | pxStr): string => {
  const numPx = typeof px === 'string' ? Number(px.replace('px', '')) : px
  const vw = `${(numPx / FIGMA_WIDTH_PX) * 100}vw`

  return `min(-${numPx}px, ${vw})`
}
const drawerWidth = a(210)
export const StyledMain = styled('main', { shouldForwardProp: prop => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))
