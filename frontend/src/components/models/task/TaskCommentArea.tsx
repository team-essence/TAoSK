import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { TaskCommentInputField } from 'components/models/task/TaskCommentInputField'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { TaskComment } from 'components/models/task/TaskComment'
import { useShowChats } from 'hooks/useShowChats'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  id: string
}

export const TaskCommentArea: FCX<Props> = ({ className, id }) => {
  const { chatList, judgeIsYourComment } = useShowChats(id)

  return (
    <StyledAllWrapper className={className}>
      <TaskCommentInputField id={id} />
      {!!chatList.length &&
        chatList.map((chat, index) => (
          <StyledCommentWrapper key={index}>
            {/* TODO: occupationも取得できるようになったら追加する */}
            <UserAvatarIcon
              avatarStyleType="modal"
              iconImage={chat.user.icon_image}
              name={chat.user.name}
            />
            <TaskComment taskId={id} chatInfo={chat} isYour={judgeIsYourComment(chat.user.id)} />
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
