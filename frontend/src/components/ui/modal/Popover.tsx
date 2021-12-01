import React, { FC } from 'react'
import Popover from '@mui/material/Popover'

type Props = {
  anchorEl: HTMLImageElement | null
  handleClose: () => void
}

export const BasicPopover: FC<Props> = ({ anchorEl, handleClose }) => {
  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handleClose = () => {
  //   setAnchorEl(null)
  // }

  // const open = Boolean(anchorEl)
  // const id = open ? 'simple-popover' : undefined

  return (
    <div>
      {/* <button aria-describedby={id} onClick={handleClick}>
        Open Popover
      </button> */}
      <Popover
        // id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>
        <p>The content of the Popover.</p>
      </Popover>
    </div>
  )
}
