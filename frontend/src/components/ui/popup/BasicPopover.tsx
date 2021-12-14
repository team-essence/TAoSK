import React, { FCX, ReactNode } from 'react'
import Popover from '@mui/material/Popover'
import { PopoverProps } from 'types/popover'

type Props = {
  children: ReactNode
} & PopoverProps

export const BasicPopover: FCX<Props> = ({
  children,
  anchorEl,
  anchorOrigin,
  transformOrigin,
  handleClose,
}) => (
  <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={anchorOrigin}
    transformOrigin={transformOrigin}>
    {children}
  </Popover>
)
