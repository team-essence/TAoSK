import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { SmallPopover } from 'components/ui/popup/SmallPopover'
import { FlexTextarea } from 'components/ui/textarea/FlexTextarea'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { usePopover } from 'hooks/usePopover'
import { useHandleChat } from 'hooks/useHandleChat'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

import type { Chat } from 'types/chat'

type Props = {
  taskId: string
  chatList: Chat[]
  chatInfo: Chat
  isYour: boolean
}

export const TaskComment: FCX<Props> = ({ taskId, chatList, chatInfo, isYour }) => {
  const { anchorEl, openPopover, closePopover } = usePopover()
  const { state, setState, onClickDeleteButton } = useHandleChat(taskId, chatInfo.id)

  return (
    <StyledTextWrapper>
      <StyledCommentInfoRow>
        <StyledCommentInfoP>
          <StyledUserNameSpan>{chatInfo.user.name}</StyledUserNameSpan>
          さんがコメントしました。&emsp;99分前
        </StyledCommentInfoP>

        {isYour && (
          <StyledEllipsisButton onClick={openPopover}>
            <StyledFontAwesomeIcon icon={faEllipsisH} />
          </StyledEllipsisButton>
        )}
      </StyledCommentInfoRow>

      {!isYour || state === 'view' ? (
        <StyledCommentText>{chatInfo.comment}</StyledCommentText>
      ) : (
        <></>
      )}

      <SmallPopover
        anchorEl={anchorEl}
        vertical="bottom"
        horizontal="left"
        handleClose={closePopover}
        handleEdit={() => setState('edit')}
        handleRemove={onClickDeleteButton}
      />
    </StyledTextWrapper>
  )
}

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${calculateMinSizeBasedOnFigma(461)};
`
const StyledCommentInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const StyledCommentInfoP = styled.p`
  white-space: pre-wrap;
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_12};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledUserNameSpan = styled.span`
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
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
const StyledCommentText = styled.p`
  display: inline-block;
  width: 100%;
  padding: ${calculateMinSizeBasedOnFigma(7)} ${calculateMinSizeBasedOnFigma(11)};
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-all;
  ${({ theme }) =>
    css`
      border: solid 1px ${convertIntoRGBA(theme.COLORS.WHITE, 0.6)};
      background-color: ${convertIntoRGBA(theme.COLORS.SILVER, 0.4)};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledFlexTextarea = styled(FlexTextarea)`
  width: ${calculateMinSizeBasedOnFigma(465)};
  > div {
    padding: 0 ${calculateMinSizeBasedOnFigma(8)};
    height: 100%;
  }
  textarea {
    padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  }
`
const StyledEditButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
