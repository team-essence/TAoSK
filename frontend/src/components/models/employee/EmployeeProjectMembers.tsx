import React, { FC } from 'react'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVhBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { EmployeeOnlineStatusLabel } from 'components/models/employee/EmployeeOnlineStatusLabel'
import { EmployeeInformation } from 'components/models/employee/EmployeeInformation'
import styled from 'styled-components'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  className?: string
} & Partial<Groups>

export const EmployeeProjectMembers: FC<Props> = ({ groups }) => {
  const a = groups?.concat(groups).concat(groups).concat(groups)

  return (
    <StyledContaner>
      <StyledMemberContainer>
        <StyledLabelContainer>
          <EmployeeOnlineStatusLabel label="オンライン" status={true} />
        </StyledLabelContainer>
        {a?.map(
          (group, index) =>
            !group.user.online_flg && (
              <StyledEmployeeContainer key={index}>
                <EmployeeInformation {...group.user} />
              </StyledEmployeeContainer>
            ),
        )}
        <StyledLabelContainer>
          <EmployeeOnlineStatusLabel label="オフライン" status={false} />
        </StyledLabelContainer>
        {a?.map(
          (group, index) =>
            !group.user.online_flg && (
              <StyledEmployeeContainer key={index}>
                <EmployeeInformation {...group.user} />
              </StyledEmployeeContainer>
            ),
        )}
      </StyledMemberContainer>
      <StyledSignBoard>MEMBER</StyledSignBoard>
    </StyledContaner>
  )
}

const StyledContaner = styled.div`
  display: flex;
  gap: ${calculateVhBasedOnFigma(8)};
`
const StyledMemberContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  max-height: ${calculateVhBasedOnFigma(680)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  white-space: normal;
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledSignBoard = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  height: ${calculateVhBasedOnFigma(142)};
  color: ${({ theme }) => theme.COLORS.WHITE};
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  filter: drop-shadow(-4px 4px 2px rgba(0, 0, 0, 0.5));
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  text-orientation: upright;
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
