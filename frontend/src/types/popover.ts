import { PopoverOrigin } from '@mui/material/Popover'

export type AnchorEl = HTMLImageElement | HTMLDivElement | HTMLButtonElement | null

export type PopoverProps = {
  anchorEl: AnchorEl
  vertical: PopoverOrigin['vertical']
  horizontal: PopoverOrigin['horizontal']
  handleClose: () => void
}
