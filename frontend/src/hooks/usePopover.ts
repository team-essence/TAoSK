import { useState } from 'react'
import { AnchorEl } from 'types/popover'

type UsePopoverReturn = {
  anchorEl: AnchorEl
  openPopover: (event: React.MouseEvent<AnchorEl>) => void
  closePopover: () => void
}

export const usePopover = (): UsePopoverReturn => {
  const [anchorEl, setAnchorEl] = useState<AnchorEl>(null)

  const openPopover = (event: React.MouseEvent<AnchorEl>) => {
    setAnchorEl(event.currentTarget)
  }

  const closePopover = () => {
    setAnchorEl(null)
  }

  return { anchorEl, openPopover, closePopover }
}
