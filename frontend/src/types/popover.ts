import { PopoverOrigin } from '@mui/material/Popover'

export type PopoverProps = {
  anchorEl: HTMLImageElement | HTMLDivElement | HTMLButtonElement | null
  vertical: PopoverOrigin['vertical']
  horizontal: PopoverOrigin['horizontal']
  handleClose: () => void
}
