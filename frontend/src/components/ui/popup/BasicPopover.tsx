import React, { FCX, ReactNode } from 'react'
import Popover, { PopoverOrigin } from '@mui/material/Popover'
import { PopoverProps } from 'types/popover'

type Props = {
  children: ReactNode
} & PopoverProps

export const BasicPopover: FCX<Props> = ({
  children,
  anchorEl,
  vertical,
  horizontal,
  handleClose,
}) => {
  const anchorOrigin: PopoverOrigin = { vertical, horizontal }

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}>
      {children}
    </Popover>
  )
}
