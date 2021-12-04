import React, { FC } from 'react'
import { SearchSameCompanyUsersMutation } from 'pages/projectList/projectList.gen'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import styled, { css } from 'styled-components'

type UserData = SearchSameCompanyUsersMutation['searchSameCompanyUsers']
type Props = {
  className?: string
  userDatas: UserData
  required?: boolean
  deleteUserData?: () => void
}

// TODO: 使うかどうかわからない。ManyUserAvatarが使えそうなので、そちらを使う場合はこれを消す
export const MemberItems: FC<Props> = ({ userDatas, required = false }) => {
  return <div></div>
}

const StyledAllWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
