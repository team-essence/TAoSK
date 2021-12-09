import React, { FC, useEffect, Dispatch, SetStateAction } from 'react'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled, { css } from 'styled-components'
import { useSearchMember } from 'hooks/useSearchMember'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import type { UserDatas } from 'types/userDatas'

type Props = {
  className?: string
  setUserDatas: Dispatch<SetStateAction<UserDatas>>
  userDatas: UserDatas
}

export const SearchMemberField: FC<Props> = ({ className, setUserDatas, userDatas }) => {
  const {
    onChange,
    onFocus,
    onBlur,
    shouldShowResult,
    candidateUserDatas,
    selectedUserDatas,
    setSelectedUserDatas,
    value,
    resetValue,
  } = useSearchMember()
  const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
    selectedUserDatas.length,
  )

  useEffect(() => setUserDatas([...selectedUserDatas]), [selectedUserDatas])

  useEffect(() => {
    // タスク作成後にstateを初期化する
    if (!userDatas.length && JSON.stringify(userDatas) !== JSON.stringify(selectedUserDatas)) {
      setSelectedUserDatas(userDatas)
      resetValue()
    }
  }, [userDatas])

  // TODO: 本番環境では消す。UserCountの挙動を確認するためのテスト用。ユーザーデータ1個追加で20個追加される
  // const testAdd = (data: UserDatas[number]) => {
  //   const testDatas: UserDatas = [...Array(20)].map(() => data)
  //   setSelectedUserDatas([...selectedUserDatas, ...testDatas])
  // }

  const onClickDeleteBtn = (index: number) => {
    selectedUserDatas.splice(index, 1)
    setSelectedUserDatas([...selectedUserDatas.slice()])
  }

  return (
    <StyledAllWrapper className={className}>
      <StyledLabel>パーティメンバー</StyledLabel>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="パーティメンバーを検索"
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {!!shouldShowResult && !!candidateUserDatas.length && (
          <StyledSearchResultWrapper>
            {candidateUserDatas.map((data, index) => (
              <StyledListItem
                key={index}
                indexAt={
                  index === 0 ? 'first' : index === candidateUserDatas.length - 1 ? 'last' : 'other'
                }
                onMouseDown={() => setSelectedUserDatas([...selectedUserDatas, data])}>
                {/* inputに付与しているonBlurによりclickイベントが発火しなくなるため、blurより先に実行させるためにonMouseDownを使用 */}
                <StyledAvatar src={data.icon_image} alt={`${data.name}のアイコン`} />
                <StyledProfile>
                  <StyledName>{data.name}</StyledName>
                  {/* TODO: queryでoccupation_idから職業が取れるようになったらそっちを使うようにする */}
                  <StyledOccupation>{occupationList[data.occupation_id - 1]}</StyledOccupation>
                </StyledProfile>
              </StyledListItem>
            ))}
          </StyledSearchResultWrapper>
        )}
      </StyledInputWrapper>

      {!!selectedUserDatas.length && (
        <StyledSelectedMembersWrapper>
          <StyledBorder />
          <StyledSelectedMembersTitle>
            {selectedUserDatas.length}人のメンバー
          </StyledSelectedMembersTitle>
          <StyledMembersContainer ref={containerRef}>
            {selectedUserDatas.map((data, index) => {
              const boxCount = index + 1
              if (boxCount < maxBoxes) {
                return (
                  <div key={index} ref={avatarRef}>
                    {/* TODO: queryでoccupation_idから職業が取れるようになったらそっちを使うようにする */}
                    <UserAvatarIcon
                      avatarStyleType={AVATAR_STYLE.MODAL}
                      iconImage={data.icon_image}
                      name={data.name}
                      occupation={occupationList[data.occupation_id]}
                      onClickDeleteBtn={() => onClickDeleteBtn(index)}
                    />
                  </div>
                )
              } else if (boxCount === maxBoxes) {
                return (
                  <div key={index}>
                    <UserCount
                      avatarStyleType={AVATAR_STYLE.MODAL}
                      userCount={overUsersCount}
                      userDatas={selectedUserDatas}
                      onClickDeleteBtn={onClickDeleteBtn}
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
const StyledInput = styled.input`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(40)};
  padding-left: ${calculateMinSizeBasedOnFigma(8)};
  padding-right: ${calculateMinSizeBasedOnFigma(8)};
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.SILVER};
  }
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
