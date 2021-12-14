import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { FlexTextarea } from 'components/ui/textarea/FlexTextarea'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { useTaskAddCommentForm } from 'hooks/useTaskAddCommentForm'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  id: string
}

export const TaskCommentInputField: FCX<Props> = ({ className, id }) => {
  const { register, myData, disabled, onClickSendButton } = useTaskAddCommentForm(id)

  if (!myData) return <></>

  return (
    <StyledAllWrapper className={className}>
      <StyledH3>コメント</StyledH3>
      <StyledField>
        <UserAvatarIcon
          avatarStyleType="modal"
          iconImage={myData.icon_image}
          name={myData.name}
          occupation={myData.occupation.name}
        />
        <StyledFlexTextarea
          {...register('comment', {
            required: '未入力です',
            maxLength: { value: 255, message: '255文字以内で入力してください' },
            pattern: { value: /.*\S+.*/, message: '空白のみのコメントは投稿できません' },
          })}
        />
      </StyledField>
      <StyledSendButtonWrapper>
        <CoarseRedOxideButton text="送信" onClick={onClickSendButton} disabled={disabled} />
      </StyledSendButtonWrapper>
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${calculateMinSizeBasedOnFigma(8)};
`
const StyledH3 = styled.h3`
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
const StyledField = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const StyledFlexTextarea = styled(FlexTextarea)`
  width: ${calculateMinSizeBasedOnFigma(465)};
  > div {
    padding: 0 ${calculateMinSizeBasedOnFigma(8)};
    height: 100%;
  }
  textarea {
    padding: ${calculateMinSizeBasedOnFigma(9.24)} ${calculateMinSizeBasedOnFigma(8)};
  }
`
const StyledSendButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
