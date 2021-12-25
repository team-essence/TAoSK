import React, { FCX } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {
  calculateVwBasedOnFigma,
  calculateVhBasedOnFigma,
  calculateMinSizeBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { calculateProjectListDetailWidth } from 'utils/calculateProjectListDetailWidth'
import { ProjectListMonster } from 'components/models/projectList/ProjectListMonster'
import { ProjectListProjectInfo } from 'components/models/projectList/ProjectListProjectInfo'
import { BUTTON_COLOR_TYPE, GorgeousButton } from 'components/ui/button/GorgeousButton'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'

type Props = {
  isJoiningProject: boolean
  userQuery: GetCurrentUserQuery['user'] | undefined
  selectProject: number
  openModal: () => void
}

export const ProjectListDetail: FCX<Props> = ({
  className,
  isJoiningProject,
  userQuery,
  selectProject,
  openModal,
}) => {
  const navigate = useNavigate()

  const handleTransitionToProject = (id?: string) => navigate(`/projects/${id}`)

  if (!isJoiningProject)
    return (
      <StyledNoProjectListDetailContainer className={className}>
        <StyledEggsImg src="/eggs.png" alt="卵たち" />

        <StyledNoProjectContainer>
          <p>
            まだプロジェクトがありません。
            <br />
            今すぐ新しいプロジェクトを始めますか
          </p>
          <GorgeousButton
            buttonColorType={BUTTON_COLOR_TYPE.RED}
            text="プロジェクト作成"
            onClick={openModal}
          />
        </StyledNoProjectContainer>
      </StyledNoProjectListDetailContainer>
    )

  return (
    <StyledProjectListDetailContainer className={className}>
      <StyledProjectDetail>
        <StyledProjectTitleContainer>
          <StyledProjectTitle>{userQuery?.groups[selectProject].project.name}</StyledProjectTitle>

          <StyledProjectOptionContainer>
            <StyledProjectOption />
          </StyledProjectOptionContainer>
        </StyledProjectTitleContainer>

        <ProjectListMonster
          specie={userQuery?.groups[selectProject].project.monster.specie.name}
          difficulty={userQuery?.groups[selectProject].project.difficulty}
          limitDeadline={userQuery?.groups[selectProject].project.end_date}
        />

        <StyledGorgeousButtonContainer>
          <GorgeousButton
            buttonColorType={BUTTON_COLOR_TYPE.RED}
            text="クエスト開始"
            onClick={() => handleTransitionToProject(userQuery?.groups[selectProject].project.id)}
          />
        </StyledGorgeousButtonContainer>

        <ProjectListProjectInfo
          story={userQuery?.groups[selectProject].project.monster.story}
          overview={userQuery?.groups[selectProject].project.overview}
          selectProject={selectProject}
          groupsProject={userQuery?.groups ?? []}
        />
      </StyledProjectDetail>
    </StyledProjectListDetailContainer>
  )
}

const StyledProjectListDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateProjectListDetailWidth(963)};
  height: ${calculateVhBasedOnFigma(721)};
  background: url('/svg/project-detail_background.svg');
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`

const StyledProjectDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 66px 1fr;
  grid-template-rows: auto auto ${calculateVhBasedOnFigma(36)} auto;
  width: ${calculateProjectListDetailWidth(813)};
  height: ${calculateVhBasedOnFigma(665)};
`

const StyledProjectTitleContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER};
`

const StyledProjectTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_24};
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

const StyledGorgeousButtonContainer = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 4;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${calculateMinSizeBasedOnFigma(20)} 0;
  width: ${calculateMinSizeBasedOnFigma(708)};
  height: ${calculateMinSizeBasedOnFigma(228.63)};
  background: url('/images/no-projects_background.svg');
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

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
