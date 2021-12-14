import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { TaskCommentInputField } from 'components/models/task/TaskCommentInputField'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useGetChats } from 'hooks/useGetChats'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  id: string
}

export const TaskCommentArea: FCX<Props> = ({ className, id }) => {
  const { chatsData } = useGetChats(id)

  return (
    <StyledAllWrapper className={className}>
      <TaskCommentInputField id={id} />
      {!!chatsData?.data &&
        chatsData.data.getChats.map((chat, index) => (
          <StyledCommentWrapper key={index}>
            {/* TODO: occupationも取得できるようになったら追加する */}
            <UserAvatarIcon
              avatarStyleType="modal"
              iconImage={chat.user.icon_image}
              name={chat.user.name}
            />
            <StyledTextWrapper>
              <StyledCommentInfoRow>
                <StyledCommentInfoP>
                  <StyledUserNameSpan>{chat.user.name}</StyledUserNameSpan>
                  さんがコメントしました。&emsp;99分前
                </StyledCommentInfoP>
                <StyledFontAwesomeIcon icon={faEllipsisH} />
              </StyledCommentInfoRow>

              <StyledCommentText>{chat.comment}</StyledCommentText>
            </StyledTextWrapper>
          </StyledCommentWrapper>
        ))}
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${calculateMinSizeBasedOnFigma(8)};
`
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
  padding: ${calculateMinSizeBasedOnFigma(11)};
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
