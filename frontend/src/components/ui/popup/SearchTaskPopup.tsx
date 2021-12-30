import React, { FCX, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { SearchTask } from 'types/task'
import { Groups } from 'types/groups'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { TaskCardPopup } from 'components/ui/popup/TaskCardPopup'
import { TaskEditModal } from 'components/models/task/TaskEditModal'

type Props = {
  searchedTasks: SearchTask[]
} & Groups

export const SearchTaskPopup: FCX<Props> = ({ className, searchedTasks, groups }) => {
  const [isTask, setIsTask] = useState(false)
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

  useEffect(() => {
    setIsTask(false)

    if (searchedTasks.length) {
      searchedTasks.map(searchedTask => {
        searchedTask.isTask && setIsTask(true)
      })
    }
  }, [searchedTasks])

  return (
    <StyledSearchTaskPopupContainer className={className}>
      {!isTask && (
        <StyledNotSearchTaskContainer>
          <StyledNotSearchTaskImage src="/svg/not-search-task.svg" alt="検索結果がないぞぉ" />
          <StyledNotSearchTaskText>検索結果がありません。</StyledNotSearchTaskText>
        </StyledNotSearchTaskContainer>
      )}

      {isTask && (
        <StyledSearchTaskWrapper>
          {searchedTasks.map((searchedTask, index, { length }) => {
            if (searchedTask.isTask) {
              return (
                <StyledSearchTask key={index}>
                  <StyledSearchTaskTitle title={searchedTask.title}>
                    {searchedTask.title}
                  </StyledSearchTaskTitle>

                  <StyledSearchTaskCardContainer>
                    {searchedTask.tasks.map((task, index) => (
                      <div key={index}>
                        <TaskCardPopup
                          openModal={() => setShouldShowModal(true)}
                          title={task.title}
                          technology={task.technology}
                          achievement={task.achievement}
                          solution={task.solution}
                          motivation={task.motivation}
                          design={task.design}
                          plan={task.plan}
                          listIndex={searchedTask.lint_index}
                          listLength={length}
                          chatCount={task.chatCount}
                          end_date={task.end_date}
                          overview={task.overview}
                          completed_flg={task.completed_flg}
                        />

                        <TaskEditModal
                          {...task}
                          shouldShow={shouldShowModal}
                          setShouldShow={setShouldShowModal}
                          groups={groups}
                        />
                      </div>
                    ))}
                  </StyledSearchTaskCardContainer>
                </StyledSearchTask>
              )
            }
          })}
        </StyledSearchTaskWrapper>
      )}
    </StyledSearchTaskPopupContainer>
  )
}

const StyledSearchTaskPopupContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(779)};
  min-height: ${calculateMinSizeBasedOnFigmaWidth(335)};
  max-height: ${calculateMinSizeBasedOnFigmaWidth(409)};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(6)};
  overflow-y: scroll;

  ${({ theme }) => css`
    padding: ${calculateMinSizeBasedOnFigmaWidth(10)} ${calculateMinSizeBasedOnFigmaWidth(30)}
      ${calculateMinSizeBasedOnFigmaWidth(34)};
    box-shadow: ${calculateMinSizeBasedOnFigmaWidth(-6)} ${calculateMinSizeBasedOnFigmaWidth(8)}
      ${calculateMinSizeBasedOnFigmaWidth(3)} ${calculateMinSizeBasedOnFigmaWidth(-1)}${convertIntoRGBA(theme.COLORS.BLACK, 0.36)};
    background: ${theme.COLORS.BLACK_WHITE};
    border: solid 1px ${theme.COLORS.SILVER};
  `}
`

const StyledNotSearchTaskContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledNotSearchTaskImage = styled.img`
  position: absolute;
  width: ${calculateMinSizeBasedOnFigmaWidth(112)};
  height: ${calculateMinSizeBasedOnFigmaWidth(112)};
`

const StyledNotSearchTaskText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  color: ${({ theme }) => theme.COLORS.DOVE_GRAY};
`

const StyledSearchTaskWrapper = styled.div``

const StyledSearchTask = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(28)};

  &:last-child {
    margin-bottom: 0;
  }
`

const StyledSearchTaskTitle = styled.div<{ title: string }>`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
  background: ${({ theme }) => theme.COLORS.SHIP_COVE};
  color: ${({ theme }) => theme.COLORS.WHITE};
  width: ${calculateMinSizeBasedOnFigmaWidth(68)};
  height: ${calculateMinSizeBasedOnFigmaWidth(14)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_10};
  line-height: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  text-align: center;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(3)};

  ${({ theme, title }) =>
    title === '未着手' &&
    css`
      background: ${theme.COLORS.CITRON};
    `}
  ${({ theme, title }) =>
    title === '完了' &&
    css`
      background: ${theme.COLORS.BOULDER};
    `};
`

const StyledSearchTaskCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${calculateMinSizeBasedOnFigmaWidth(10)} ${calculateMinSizeBasedOnFigmaWidth(8)};
`
