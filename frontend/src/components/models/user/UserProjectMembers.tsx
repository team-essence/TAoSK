import React, { FC } from 'react'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { UserOnlineStatusLabel } from 'components/models/user/UserOnlineStatusLabel'
import { UserEmployeeInformation } from 'components/models/user/UserEmployeeInformation'
import styled from 'styled-components'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  className?: string
} & Partial<Groups>

export const UserProjectMembers: FC<Props> = ({ groups }) => {
  const a = groups?.concat(groups).concat(groups).concat(groups)

  return (
    <StyledContainer>
      <StyledLabelContainer>
        <UserOnlineStatusLabel label="オンライン" status={true} />
      </StyledLabelContainer>
      {a?.map(
        (group, index) =>
          !group.user.online_flg && (
            <StyledEmployeeContainer key={index}>
              <UserEmployeeInformation {...group.user} />
            </StyledEmployeeContainer>
          ),
      )}
      <StyledLabelContainer>
        <UserOnlineStatusLabel label="オフライン" status={false} />
      </StyledLabelContainer>
      {a?.map(
        (group, index) =>
          !group.user.online_flg && (
            <StyledEmployeeContainer key={index}>
              <UserEmployeeInformation {...group.user} />
            </StyledEmployeeContainer>
          ),
      )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  white-space: normal;
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
