import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { SmallPopover } from 'components/ui/popup/SmallPopover'
import { FlexTextarea } from 'components/ui/textarea/FlexTextarea'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { CancelButton } from 'components/ui/button/CancelButton'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { usePopover } from 'hooks/usePopover'
import { useHandleChat } from 'hooks/useHandleChat'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

import type { Chat } from 'types/chat'
import date from 'utils/date/date'

type Props = {
  taskId: string
  chatInfo: Chat
  isYour: boolean
}

export const TaskComment: FCX<Props> = ({ taskId, chatInfo, isYour }) => {
  const { anchorEl, openPopover, closePopover } = usePopover()
  const { register, state, setState, disabled, onClickDeleteButton, onClickUpdateButton } =
    useHandleChat({
      taskId,
      chatId: chatInfo.id,
      initialValue: chatInfo.comment,
    })

  return (
    <StyledCommentWrapper>
      <UserAvatarIcon
        avatarStyleType="modal"
        iconImage={chatInfo.user.icon_image}
        name={chatInfo.user.name}
        occupation={chatInfo.user.occupation.name}
      />

      <StyledTextWrapper>
        <StyledCommentInfoRow>
          <StyledCommentInfoP>
            <StyledUserNameSpan>{chatInfo.user.name}</StyledUserNameSpan>
            さんがコメントしました。&emsp;{date.formatDistance(chatInfo.updated_at)}
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
          <StyledInputFormField>
            <StyledFlexTextarea
              initialVal={chatInfo.comment}
              {...register('comment', {
                required: '未入力です',
                maxLength: { value: 255, message: '255文字以内で入力してください' },
                pattern: { value: /.*\S+.*/, message: '空白のみのコメントは投稿できません' },
                validate: value => value !== chatInfo.comment,
              })}
            />

            <StyledButtonWrapper>
              <CancelButton onClick={() => setState('view')} />
              <CoarseRedOxideButton text="保存" onClick={onClickUpdateButton} disabled={disabled} />
            </StyledButtonWrapper>
          </StyledInputFormField>
        )}

        <SmallPopover
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          handleClose={closePopover}
          handleEdit={() => setState('edit')}
          handleRemove={onClickDeleteButton}
        />
      </StyledTextWrapper>
    </StyledCommentWrapper>
  )
}

const StyledCommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

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
const StyledInputFormField = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledFlexTextarea = styled(FlexTextarea)`
  width: 100%;
  > div {
    min-height: ${calculateMinSizeBasedOnFigma(36)};
  }
  textarea {
    padding: ${calculateMinSizeBasedOnFigma(10)} ${calculateMinSizeBasedOnFigma(8)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  }
`
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(12)};
  width: 100%;
`
