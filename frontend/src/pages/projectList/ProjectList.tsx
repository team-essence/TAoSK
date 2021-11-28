import React, { FC, useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import {
  useSearchSameCompanyUsersMutation,
  useCreateProjectMutation,
  useUsersLazyQuery,
  useGetInvitationsLazyQuery,
} from './projectList.gen'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { Rating, RatingView } from 'react-simple-star-rating'
import styled from 'styled-components'
import logger from 'utils/debugger/logger'
import date from 'utils/date/date'
import toast from 'utils/toast/toast'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { Loading } from 'components/ui/loading/Loading'
import { ICON_TYPE, UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'

export const ProjectList: FC = () => {
  const { currentUser } = useAuthContext()
  const [getUserById, userData] = useUsersLazyQuery()
  const [searchSameCompanyUsers, searchSameCompanyUsersData] = useSearchSameCompanyUsersMutation()
  const [createProject, createProjectData] = useCreateProjectMutation({
    onCompleted(data) {
      toast.success('プロジェクトが作成されました')
    },
    onError(err) {
      toast.error('プロジェクトの作成に失敗しました')
    },
  })
  const [getInvitation, invitations] = useGetInvitationsLazyQuery()
  const projectTitle = useInput('')
  const projectSummary = useInput('')
  const projectDatePicker = useInput(date.getToday())
  const [ratingStar, setRatingStar] = useState<number>(1)
  const [selectUserIds, setSelectUserIds] = useState<string[]>([])
  const [uid, setUid] = useState<string>('')

  const projectUserName = useInput('')
  const debouncedInputText = useDebounce(projectUserName.value, 500)

  useEffect(() => {
    searchSameCompanyUsers({
      variables: {
        selectUserIds: selectUserIds,
        name: debouncedInputText,
        company: userData.data?.user.company ? userData.data?.user.company : '',
      },
    })
    logger.debug(debouncedInputText)
  }, [debouncedInputText])

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
    getInvitation({ variables: { userId: currentUser.uid } })
    setSelectUserIds(selectUserIds => [...selectUserIds, currentUser.uid])
    setUid(currentUser.uid)
  }, [currentUser])

  const handleStarCnt = (index: number) => {
    setRatingStar(index)
  }

  const handleInsertSelectUserId = (userId: string) => {
    setSelectUserIds(selectUserIds => [...selectUserIds, userId])
  }

  const tryCreateProject = async (
    name: string,
    overview: string,
    difficulty: number,
    end_date: string,
    ids: string[],
  ) => {
    createProject({
      variables: {
        name,
        overview,
        difficulty,
        end_date,
        ids,
      },
    })
  }

  const projectInfoTitle = (title: string) => {
    return (
      <StyledProjectInfoTitleContainer>
        <img src="/svg/project-detail_title-arrow_left.svg" alt="左矢印" />
        <StyledProjectInfoTitle>{title}</StyledProjectInfoTitle>
        <img src="/svg/project-detail_title-arrow_right.svg" alt="右矢印" />
      </StyledProjectInfoTitleContainer>
    )
  }

  if (!currentUser) return <Navigate to="/signup" />

  return (
    <>
      <ProjectListHeader />
      <StyledProjectListPageContainer>
        <StyledProjectListContainer>
          <StyledProjectListWrapper>
            <StyledProjectCreateButton>
              <img src="create-project_button.png" alt="プロジェクト作成" />
            </StyledProjectCreateButton>

            <StyledProjectList>
              <StyledProject></StyledProject>
            </StyledProjectList>
          </StyledProjectListWrapper>
        </StyledProjectListContainer>

        <StyledProjectDetailContainer>
          <StyledProjectDetail>
            <StyledProjectTitleContainer>
              <StyledProjectTitle>タイトル</StyledProjectTitle>

              <StyledProjectOptionContainer>
                <StyledProjectOption />
              </StyledProjectOptionContainer>
            </StyledProjectTitleContainer>

            <StyledMonsterContainer>
              <MonsterAvatar />

              <StyledMonsterStatusContainer>
                <StyledMonsterStatus>
                  <h4>種族</h4>
                  <p>ドラゴン</p>
                </StyledMonsterStatus>
                <StyledMonsterStatus>
                  <h4>危険度</h4>
                  <RatingContainer>
                    <RatingView ratingValue={6}>
                      <img src="/svg/star.svg" alt="スター" />
                    </RatingView>
                  </RatingContainer>
                </StyledMonsterStatus>
                <StyledMonsterStatus>
                  <h4>制限期限</h4>
                  <p>{date.formatDay('2021/12/12')}</p>
                </StyledMonsterStatus>
              </StyledMonsterStatusContainer>
            </StyledMonsterContainer>

            <StyledProjectInfoContainer>
              {projectInfoTitle('特徴')}
              <p style={{ marginBottom: 12 }}>
                モンスターの特徴を説明。モンスターの特徴を説明。モンスターの特徴を説明。モンスターの特徴を説明。モンスターの特徴を説明。モンスターの特徴を説明。
              </p>
              {projectInfoTitle('依頼内容')}
              <p style={{ marginBottom: 12 }}>
                依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。依頼内容を説明。
              </p>
              {projectInfoTitle('パーティーメンバー')}
              <StyledPartyContainer>
                <UserAvatarIcon iconType={ICON_TYPE.LIST} />
                <UserAvatarIcon iconType={ICON_TYPE.LIST} />
                <UserAvatarIcon iconType={ICON_TYPE.LIST} />
                <UserAvatarIcon iconType={ICON_TYPE.LIST} />
                <UserAvatarIcon iconType={ICON_TYPE.LIST} />
                <UserCount userCount={3} />
              </StyledPartyContainer>
            </StyledProjectInfoContainer>
          </StyledProjectDetail>
        </StyledProjectDetailContainer>
        <StyledProjectListBackground />
        {/* <NavLink to={`/mypage/${uid}`}>マイページへ遷移</NavLink>
      <p>プロジェクト一覧</p>

      {invitations.data?.invitations.map((invitation, index) => (
        <div key={index} style={{ border: 'solid red' }}>
          <p>プロジェクト名: {invitation.project.name}</p>
          <p>プロジェクトID: {invitation.project.id}</p>
        </div>
      ))}
      <br />
      <TestModalContainer>
        <h4>プロジェクト作成モーダルの内容</h4>
        <input
          type="text"
          placeholder="プロジェクト名を入力"
          required
          maxLength={50}
          {...projectTitle}
        />
        <br />
        <textarea placeholder="プロジェクトの概要を" required maxLength={50} {...projectSummary} />
        <p>※期限の入力を作る必要あり。現在の日付を入れておく</p>
        <input type="date" {...projectDatePicker} min={date.getToday()} />
        <br />
        <p>※難易度作る必要あり。1を入れておく</p>
        <Rating onClick={handleStarCnt} ratingValue={ratingStar} stars={10} />
        <br />
        <p>※メンバーの検索作る必要あり。自分だけを入れておく</p>
        <input type="text" {...projectUserName} />

        <p>選んだユーザ一覧</p>
        {JSON.stringify(selectUserIds)}

        <p>検索結果一覧</p>
        {debouncedInputText &&
          searchSameCompanyUsersData.data?.searchSameCompanyUsers.map(searchSameCompanyUsers =>
            selectUserIds.includes(searchSameCompanyUsers.id) ? (
              <></>
            ) : (
              <div
                onClick={() => handleInsertSelectUserId(searchSameCompanyUsers.id)}
                key={searchSameCompanyUsers.id}>
                <h2>名前: {searchSameCompanyUsers.name}</h2>
                <p>id: {searchSameCompanyUsers.id}</p>
              </div>
            ),
          )}
        <button
          style={{ border: 'solid' }}
          onClick={() =>
            tryCreateProject(
              projectTitle.value,
              projectSummary.value,
              ratingStar,
              projectDatePicker.value,
              selectUserIds,
            )
          }>
          プロジェクト作成するよボタン
        </button> */}

        {/*
      </TestModalContainer> */}
      </StyledProjectListPageContainer>
    </>
  )
}

const StyledProjectListPageContainer = styled.div`
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.COLORS.SHIP_GRAY};
`

const StyledProjectListContainer = styled.div`
  position: relative;
  margin-top: ${calculateVhBasedOnFigma(3)};
  width: ${calculateVwBasedOnFigma(437)};
  height: ${calculateVhBasedOnFigma(770)};
  background: url('project-list_background.png');
  background-position: cover;
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledProjectListWrapper = styled.div`
  position: absolute;
  top: ${calculateVwBasedOnFigma(120)};
  left: 50%;
  transform: translateX(-54%);
  width: ${calculateVwBasedOnFigma(356)};
  height: ${calculateVhBasedOnFigma(564)};
  background: #fff;
`

const StyledProjectCreateButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: ${calculateVwBasedOnFigma(314)};
`

const StyledProjectList = styled.ul``

const StyledProject = styled.li``

const StyledProjectDetailContainer = styled.div`
  position: relative;
  margin-top: ${calculateVhBasedOnFigma(3)};
  width: ${calculateVwBasedOnFigma(971)};
  height: ${calculateVhBasedOnFigma(823)};
  background: url('project-detail_background.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`

const StyledProjectListBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: fixed;
  top: ${({ theme }) => theme.HEADER_HEIGHT};
  left: 0;
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.HEADER_HEIGHT});
  background: url('images/project-list-page_background.webp');
  background-attachment: fixed;
  background-position: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`

const StyledProjectDetail = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: ${calculateVhBasedOnFigma(800)};
  height: ${calculateVhBasedOnFigma(662)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
`

const StyledProjectTitleContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledProjectTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_24};
`

const StyledProjectOptionContainer = styled.div`
  margin-right: ${calculateVhBasedOnFigma(12)};
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

const StyledMonsterContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`

const StyledMonsterStatusContainer = styled.div`
  width: ${calculateVhBasedOnFigma(346)};
  border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
`

const StyledMonsterStatus = styled.div`
  padding: ${calculateVhBasedOnFigma(6)} 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(2) {
    border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
    border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  }
`

const RatingContainer = styled.div`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledProjectInfoContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;

  p {
    text-align: justify;
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  }
`

const StyledProjectInfoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    opacity: 0.2;
    width: ${calculateVwBasedOnFigma(98)};
  }
`

const StyledProjectInfoTitle = styled.h3`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
`

const StyledPartyContainer = styled.div`
  display: flex;
  gap: 0 ${calculateVwBasedOnFigma(6)};
`

const TestModalContainer = styled.div`
  border: solid 1px #000;
`
