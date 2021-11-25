import React, { FC, useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useAuthContext } from 'context/AuthProvider'
import {
  useSearchSameCompanyUsersMutation,
  useCreateProjectMutation,
  useUsersLazyQuery,
  useGetInvitationsLazyQuery,
} from './projectList.gen'
import { useInput } from 'hooks/useInput'
import { useDebounce } from 'hooks/useDebounce'
import { Rating } from 'react-simple-star-rating'
import styled from 'styled-components'
import logger from 'utils/debugger/logger'
import date from 'utils/date/date'
import toast from 'utils/toast/toast'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'

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

  if (!currentUser) return <Navigate to="/signup" />

  return (
    <StyledProjectListPageContainer>
      <ProjectListHeader />

      <StyledProjectListContainer>
        <StyledProjectListWrapper>
          <StyledProjectCreateButton />

          <StyledProjectList>
            <StyledProject></StyledProject>
          </StyledProjectList>
        </StyledProjectListWrapper>
      </StyledProjectListContainer>

      <StyledProjectDetailContainer></StyledProjectDetailContainer>
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

      {/* <MonsterAvatar />
      </TestModalContainer> */}
    </StyledProjectListPageContainer>
  )
}

const StyledProjectListPageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: url('images/project-list-page_background.webp');
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
`

const StyledProjectListContainer = styled.div`
  position: relative;
  top: ${calculateVwBasedOnFigma(72)};
  left: 0;
  width: ${calculateVwBasedOnFigma(437)};
  height: ${calculateVwBasedOnFigma(770)};
  background: url('project-list_background.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledProjectListWrapper = styled.div`
  top: ${calculateVwBasedOnFigma(120)};
  left: ${calculateVwBasedOnFigma(8)};
  position: relative;
  width: ${calculateVwBasedOnFigma(396)};
  height: ${calculateVwBasedOnFigma(564)};
  background: #fff;
`

const StyledProjectCreateButton = styled.button`
  width: ${calculateVwBasedOnFigma(396)};
  height: ${calculateVwBasedOnFigma(60)};
  background: url('svg/create-project_button.svg') center center no-repeat;
  background-size: cover;
`

const StyledProjectList = styled.ul``

const StyledProject = styled.li``

const StyledProjectDetailContainer = styled.div`
  background: url('project-detail_background.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: ${calculateVwBasedOnFigma(971)};
  height: ${calculateVwBasedOnFigma(823)};
  position: relative;
  top: ${calculateVwBasedOnFigma(72)};
`

const TestModalContainer = styled.div`
  border: solid 1px #000;
`
