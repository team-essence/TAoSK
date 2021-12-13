import React, { FCX } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { ProjectListMonster } from './ProjectListMonster'
import { ProjectListProjectInfo } from './ProjectListProjectInfo'
import { BUTTON_COLOR_TYPE, ComplicateButton } from 'components/ui/button/ComplicateButton'
import { UsersQuery } from 'pages/projectList/projectList.gen'
import logger from 'utils/debugger/logger'

type Props = {
  isJoiningProject: boolean
  userQuery: UsersQuery | undefined
  selectProject: number
}

export const ProjectListDetail: FCX<Props> = ({ isJoiningProject, userQuery, selectProject }) => {
  const navigate = useNavigate()

  const handleTransitionToProject = (id?: string) => {
    navigate(`/projects/${id}`)
  }

  if (!isJoiningProject)
    return (
      <StyledNoProjectListDetailContainer>
        <StyledEggsImg src="/eggs.png" alt="卵たち" />

        <StyledNoProjectContainer>
          <p>
            まだプロジェクトがありません。
            <br />
            今すぐ新しいプロジェクトを始めますか
          </p>

          <ComplicateButton
            buttonColorType={BUTTON_COLOR_TYPE.RED}
            text="プロジェクト作成"
            onClick={() => logger.debug('開ゴマ')}
          />
        </StyledNoProjectContainer>
      </StyledNoProjectListDetailContainer>
    )

  return (
    <StyledProjectListDetailContainer>
      <StyledProjectDetail>
        <StyledProjectTitleContainer>
          <StyledProjectTitle>
            {userQuery!.user.groups[selectProject].project.name}
          </StyledProjectTitle>

          <StyledProjectOptionContainer>
            <StyledProjectOption />
          </StyledProjectOptionContainer>
        </StyledProjectTitleContainer>

        <ProjectListMonster
          specie={userQuery!.user.groups[selectProject].project.monster.specie.name}
          difficulty={userQuery!.user.groups[selectProject].project.difficulty}
          limitDeadline={userQuery!.user.groups[selectProject].project.end_date}
        />

        <StyledComplicateButtonContainer>
          <ComplicateButton
            buttonColorType={BUTTON_COLOR_TYPE.RED}
            text="クエスト開始"
            onClick={() =>
              handleTransitionToProject(userQuery!.user.groups[selectProject].project.id)
            }
          />
        </StyledComplicateButtonContainer>

        <ProjectListProjectInfo
          story={userQuery!.user.groups[selectProject].project.monster.story}
          overview={userQuery!.user.groups[selectProject].project.overview}
          selectProject={selectProject}
          groupsProject={userQuery!.user.groups}
        />
      </StyledProjectDetail>
    </StyledProjectListDetailContainer>
  )
}

const StyledProjectListDetailContainer = styled.div`
  padding: 28px;
  margin-top: ${calculateMinSizeBasedOnFigma(28)};
  width: ${calculateMinSizeBasedOnFigma(977)};
  min-height: ${calculateMinSizeBasedOnFigma(758)};
  background: url('/svg/project-detail_background.svg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledProjectDetail = styled.div`
  width: ${calculateMinSizeBasedOnFigma(813)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr ${calculateMinSizeBasedOnFigma(40)} auto;
`

const StyledProjectTitleContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledProjectTitle = styled.h2`
  font-size: ${calculateMinSizeBasedOnFigma(24)};
`

const StyledProjectOptionContainer = styled.div`
  margin-right: ${calculateMinSizeBasedOnFigma(12)};
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledProjectOption = styled.div`
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.BLACK};

  &::before {
    content: '';
    position: absolute;
    right: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.BLACK};
  }

  &::after {
    content: '';
    left: 10px;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.BLACK};
  }
`

const StyledComplicateButtonContainer = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledNoProjectListDetailContainer = styled(StyledProjectListDetailContainer)`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigma(33)} 0;
`

const StyledNoProjectContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigma(708)};
  height: ${calculateMinSizeBasedOnFigma(228.63)};
  background: url('/images/no-projects_background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calculateMinSizeBasedOnFigma(20)} 0;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: ${calculateMinSizeBasedOnFigma(-5)};
    left: 0;
    width: 0px;
    height: 0px;
    margin: auto;
    border-style: solid;
    border-color: ${({ theme }) => theme.COLORS.COD_GRAY} transparent transparent transparent;
    border-width: ${calculateMinSizeBasedOnFigma(19)} ${calculateMinSizeBasedOnFigma(22.5)} 0
      ${calculateMinSizeBasedOnFigma(22.5)};
    transform: rotate(180deg);
  }

  p {
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
    text-align: center;
  }
`

const StyledEggsImg = styled.img`
  width: ${calculateMinSizeBasedOnFigma(317.5)};
`
