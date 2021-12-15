import { PopoverOrigin } from '@mui/material/Popover'

export type AnchorEl = HTMLImageElement | HTMLDivElement | HTMLButtonElement | null

export type PopoverProps = {
  anchorEl: AnchorEl
  anchorOrigin?: PopoverOrigin
  transformOrigin?: PopoverOrigin
  handleClose: () => void
}
