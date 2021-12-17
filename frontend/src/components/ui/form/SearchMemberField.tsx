import React, { FCX, useEffect, Dispatch, SetStateAction } from 'react'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled, { css } from 'styled-components'
import { useSearchMember } from 'hooks/useSearchMember'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import type { UserData } from 'types/userData'
import type { Task } from 'types/task'

type Props = {
  setUserData: Dispatch<SetStateAction<UserData>>
  userData: UserData
  shouldCache: boolean
  completed_flag?: Task['completed_flg']
  isFixedFirstUser?: boolean
}

export const SearchMemberField: FCX<Props> = ({
  className,
  setUserData,
  userData,
  shouldCache,
  completed_flag = false,
  isFixedFirstUser = false,
}) => {
  const {
    onChange,
    onFocus,
    onBlur,
    shouldShowResult,
    candidateUserData,
    selectedUserData,
    setSelectedUserData,
    value,
  } = useSearchMember(userData, shouldCache)
  const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
    selectedUserData.length,
  )

  useEffect(() => setUserData([...selectedUserData]), [selectedUserData])

  // TODO: 本番環境では消す。UserCountの挙動を確認するためのテスト用。ユーザーデータ1個追加で20個追加される
  // const testAdd = (data: UserData[number]) => {
  //   const testDatas: UserData = [...Array(20)].map(() => data)
  //   setSelectedUserData([...selectedUserData, ...testDatas])
  // }

  const onClickDeleteBtn = (index: number) => {
    selectedUserData.splice(index, 1)
    setSelectedUserData([...selectedUserData.slice()])
  }

  return (
    <StyledAllWrapper className={className}>
      <StyledLabel>パーティメンバー</StyledLabel>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="パーティメンバーを検索"
          value={value}
          disabled={completed_flag}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {!!shouldShowResult && !!candidateUserData.length && (
          <StyledSearchResultWrapper>
            {candidateUserData.map((data, index) => (
              <StyledListItem
                key={index}
                indexAt={
                  index === 0 ? 'first' : index === candidateUserData.length - 1 ? 'last' : 'other'
                }
                onMouseDown={() => setSelectedUserData([...selectedUserData, data])}>
                {/* inputに付与しているonBlurによりclickイベントが発火しなくなるため、blurより先に実行させるためにonMouseDownを使用 */}
                <StyledAvatar src={data.icon_image} alt={`${data.name}のアイコン`} />
                <StyledProfile>
                  <StyledName>{data.name}</StyledName>
                  {/* TODO: queryでoccupation_idから職業が取れるようになったらそっちを使うようにする */}
                  <StyledOccupation>{data.occupation.name}</StyledOccupation>
                </StyledProfile>
              </StyledListItem>
            ))}
          </StyledSearchResultWrapper>
        )}
      </StyledInputWrapper>

      {!!selectedUserData.length && (
        <StyledSelectedMembersWrapper>
          <StyledBorder />
          <StyledSelectedMembersTitle>
            {selectedUserData.length}人のメンバー
          </StyledSelectedMembersTitle>
          <StyledMembersContainer ref={containerRef}>
            {selectedUserData.map((data, index) => {
              const boxCount = index + 1

              if (boxCount < maxBoxes) {
                const shouldHideDeleteBtn = completed_flag || (index === 0 && isFixedFirstUser)

                return (
                  <div key={index} ref={avatarRef}>
                    <UserAvatarIcon
                      avatarStyleType={AVATAR_STYLE.MODAL}
                      iconImage={data.icon_image}
                      name={data.name}
                      occupation={data.occupation.name}
                      onClickDeleteBtn={
                        shouldHideDeleteBtn ? undefined : () => onClickDeleteBtn(index)
                      }
                    />
                  </div>
                )
              } else if (boxCount === maxBoxes) {
                return (
                  <div key={index}>
                    <UserCount
                      avatarStyleType={AVATAR_STYLE.MODAL}
                      userCount={overUsersCount}
                      userData={selectedUserData}
                      onClickDeleteBtn={completed_flag ? undefined : onClickDeleteBtn}
                    />
                  </div>
                )
              }
            })}
          </StyledMembersContainer>
        </StyledSelectedMembersWrapper>
      )}
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  position: relative;
`
const StyledLabel = styled.label`
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_16};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
`
const StyledInputWrapper = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: ${calculateMinSizeBasedOnFigma(8)};
    width: ${calculateMinSizeBasedOnFigma(15)};
    height: ${calculateMinSizeBasedOnFigma(15)};
    background-image: url('/svg/search-icon.svg');
    background-size: 100% 100%;
  }
`
const StyledInput = styled.input<{ disabled: boolean }>`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(40)};
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  padding-right: ${calculateMinSizeBasedOnFigma(8)};
  border-radius: 4px;
  ${({ theme, disabled }) =>
    css`
      ${disabled &&
      css`
        cursor: not-allowed;
      `}
      border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      &::placeholder {
        color: ${theme.COLORS.SILVER};
      }
    `}
`
const StyledSearchResultWrapper = styled.ul`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_3};
  position: absolute;
  top: 100%;
  left: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(200)};
  border: solid 1px ${({ theme }) => theme.COLORS.SILVER};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.BLACK_WHITE};
`
const StyledListItem = styled.li<{ indexAt: 'first' | 'last' | 'other' }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(8)};
  ${({ indexAt }) => {
    if (indexAt === 'first') {
      return css`
        padding: ${calculateMinSizeBasedOnFigma(8)} ${calculateMinSizeBasedOnFigma(8)}
          ${calculateMinSizeBasedOnFigma(4)};
      `
    } else if (indexAt === 'last') {
      return css`
        padding: ${calculateMinSizeBasedOnFigma(4)} ${calculateMinSizeBasedOnFigma(8)}
          ${calculateMinSizeBasedOnFigma(8)};
      `
    } else {
      return css`
        padding: ${calculateMinSizeBasedOnFigma(4)} ${calculateMinSizeBasedOnFigma(8)};
      `
    }
  }}
  &:hover {
    background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.SILVER, 0.1)};
  }
`
const StyledAvatar = styled.img`
  box-sizing: border-box;
  object-fit: contain;
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigma(30)};
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.2)};
  border-radius: 2px;
`
const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  line-height: 1.3;
`
const StyledName = styled.p`
  color: ${({ theme }) => theme.COLORS.BLACK};
`
const StyledOccupation = styled.p`
  color: ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.4)};
`
const StyledSelectedMembersWrapper = styled.div``
const StyledBorder = styled.div`
  margin: ${calculateMinSizeBasedOnFigma(7)} 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledSelectedMembersTitle = styled.p`
  margin-bottom: ${calculateMinSizeBasedOnFigma(7)};
  ${({ theme }) => css`
    color: ${theme.COLORS.TOBACCO_BROWN};
    font-size: ${theme.FONT_SIZES.SIZE_14};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
`
const StyledMembersContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(6)};
  width: 100%;
`
