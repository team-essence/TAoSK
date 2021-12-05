import React, { FC } from 'react'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateVhBasedOnFigma,
} from 'utils/calculateSizeBasedOnFigma'
import { EmployeeOnlineStatusLabel } from 'components/models/employee/EmployeeOnlineStatusLabel'
import { EmployeeInformation } from 'components/models/employee/EmployeeInformation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  className?: string
} & Partial<Groups>

export const EmployeeProjectMembers: FC<Props> = ({ groups }) => {
  return (
    <StyledContaner>
      <StyledMemberContainer>
        <StyledLabelContainer>
          <EmployeeOnlineStatusLabel label="オンライン" status={true} />
        </StyledLabelContainer>
        {groups?.map(
          (group, index) =>
            group.user.online_flg && (
              <StyledEmployeeContainer key={index}>
                {/* FIXME: technology, achievement, motivation, solution、5 などのプロパティがありませんとエラーが起きたのでエラー回避のため一旦コメントアウト */}
                {/* <EmployeeInformation {...group.user} /> */}
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
                {/* FIXME: technology, achievement, motivation, solution、5 などのプロパティがありませんとエラーが起きたのでエラー回避のため一旦コメントアウト */}
                {/* <EmployeeInformation {...group.user} /> */}
              </StyledEmployeeContainer>
            ),
        )}
      </StyledMemberContainer>
      <StyledSignBoardContainer>
        <StyledH3>MEMBER</StyledH3>
        <StyledFontAwesomeIcon icon={faCaretRight} />
      </StyledSignBoardContainer>
    </StyledContaner>
  )
}

const StyledContaner = styled.div`
  display: flex;
  gap: ${calculateVhBasedOnFigma(8)};
  align-items: baseline;
`
const StyledMemberContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(210)};
  height: ${calculateVhBasedOnFigma(680)};
  padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledSignBoardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  filter: drop-shadow(-4px 4px 2px rgba(0, 0, 0, 0.5));
  writing-mode: vertical-rl;
  -webkit-writing-mode: vertical-rl;
  -ms-writing-mode: tb-rl;
  text-orientation: upright;
`
const StyledH3 = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  /* font-family: 'ZCOOL QingKe HuangYou' 'Inter', 'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', Meiryo, sans-serif; */
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledEmployeeContainer = styled.div`
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledLabelContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(10)} 0;
`
