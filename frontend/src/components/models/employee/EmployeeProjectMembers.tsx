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
  return (
    <StyledContainer>
      <StyledLabelContainer>
        <EmployeeOnlineStatusLabel label="オンライン" status={true} />
      </StyledLabelContainer>
      {groups?.map(
        (group, index) =>
          group.user.online_flg && (
            <StyledEmployeeContainer key={index}>
              <EmployeeInformation {...group.user} />
            </StyledEmployeeContainer>
          ),
      )}
      <StyledLabelContainer>
        <EmployeeOnlineStatusLabel label="オフライン" status={false} />
      </StyledLabelContainer>
      {groups?.map(
        (group, index) =>
          !group.user.online_flg && (
            <StyledEmployeeContainer key={index}>
              <EmployeeInformation {...group.user} />
            </StyledEmployeeContainer>
          ),
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  height: ${calculateVhBasedOnFigma(640)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
