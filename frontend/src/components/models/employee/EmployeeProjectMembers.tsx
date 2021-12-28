import React, { FCX, useEffect, useState } from 'react'
import { GetProjectQuery } from 'pages/projectDetail/projectDetail.gen'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVhBasedOnFigma,
  calculateVwBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { EmployeeOnlineStatusLabel } from 'components/models/employee/EmployeeOnlineStatusLabel'
import { EmployeeInformation } from 'components/models/employee/EmployeeInformation'
import styled from 'styled-components'
import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { useOnlineSubscription } from 'hooks/subscriptions/useOnlineSubscription'
import { useGroupByTaskSubscription } from 'hooks/subscriptions/useGroupByTaskSubscription'
import logger from 'utils/debugger/logger'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>
type Props = Partial<Groups>

export const EmployeeProjectMembers: FCX<Props> = ({ groups }) => {
  const [groupList, setGroupList] = useState<
    Omit<GetUserQuery['user'], 'company' | 'memo' | 'invitations'>[]
  >([])

  const { updateGroupList } = useOnlineSubscription()
  const { updateGroupListByTask } = useGroupByTaskSubscription()

  useEffect(() => {
    if (!groups) return

    setGroupList([...groups.map(group => ({ ...group.user }))])
  }, [groups])

  useEffect(() => {
    setGroupList(updateGroupList)
  }, [updateGroupList])

  useEffect(() => {
    logger.debug(updateGroupListByTask, 'hoge')
    setGroupList(updateGroupListByTask)
  }, [updateGroupListByTask])

  return (
    <StyledContainer>
      <StyledLabelContainer>
        <EmployeeOnlineStatusLabel label="オンライン" status={true} />
      </StyledLabelContainer>
      {!!groupList.length &&
        groupList.map(
          (group, index) =>
            group.online_flg && (
              <StyledEmployeeContainer key={index}>
                <EmployeeInformation {...group} />
              </StyledEmployeeContainer>
            ),
        )}

      <StyledLabelContainer>
        <EmployeeOnlineStatusLabel label="オフライン" status={false} />
      </StyledLabelContainer>
      {!!groupList.length &&
        groupList.map(
          (group, index) =>
            !group.online_flg && (
              <StyledEmployeeContainer key={index}>
                <EmployeeInformation {...group} />
              </StyledEmployeeContainer>
            ),
        )}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  height: ${calculateVwBasedOnFigma(580)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  overflow-x: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
