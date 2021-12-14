import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { SmallPopover } from 'components/ui/popup/SmallPopover'
import { usePopover } from 'hooks/usePopover'
import { useHandleChat } from 'hooks/useHandleChat'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

import type { Chat } from 'types/chat'

type Props = {
  taskId: string
  chatList: Chat[]
  chatInfo: Chat
}

export const TaskComment: FCX<Props> = ({ taskId, chatList, chatInfo }) => {
  const { anchorEl, openPopover, closePopover } = usePopover()
  const { state, setState, onClickDeleteButton } = useHandleChat(taskId, chatInfo.id)

  return (
    <>
      <StyledEllipsisButton onClick={openPopover}>
        <StyledFontAwesomeIcon icon={faEllipsisH} />
      </StyledEllipsisButton>
      <SmallPopover
        anchorEl={anchorEl}
        vertical="bottom"
        horizontal="left"
        handleClose={closePopover}
        handleEdit={e => console.log(e)}
        handleRemove={onClickDeleteButton}
      />
    </>
  )
}

const StyledEllipsisButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(15)};
  height: 100%;
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_12};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
