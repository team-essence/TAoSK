import React, { FC } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { theme } from 'styles/theme'
import styled from 'styled-components'
import type { UseSearchMemberReturn } from 'hooks/useSearchMember'
import { occupationList } from 'consts/occupationList'

type Props = { className?: string } & UseSearchMemberReturn

export const SearchMemberField: FC<Props> = ({
  className,
  onChange,
  onFocus,
  onBlur,
  shouldShowResult,
  userDatas,
  userIds,
}) => {
  return (
    <StyledAllWrapper className={className}>
      <StyledLabel>パーティメンバー</StyledLabel>
      <StyledInputWrapper>
        <StyledInput
          type="text"
          placeholder="パーティメンバーを検索"
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </StyledInputWrapper>

      {!!shouldShowResult && !!userDatas.length && (
        <StyledSearchResultWrapper>
          {userDatas.map((data, index) => (
            <StyledListItem key={index}>
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

      {!!userIds.length && (
        <StyledSelectedMembersWrapper>
          <StyledBorder />
          <StyledSelectedMembersTitle>{userIds.length}人のメンバー</StyledSelectedMembersTitle>
        </StyledSelectedMembersWrapper>
      )}
    </StyledAllWrapper>
  )
}

const StyledAllWrapper = styled.div`
  position: relative;
`
const StyledLabel = styled.label`
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`
const StyledInputWrapper = styled.div`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: ${calculateMinSizeBasedOnFigmaWidth(8)};
    width: ${calculateMinSizeBasedOnFigmaWidth(15)};
    height: ${calculateMinSizeBasedOnFigmaWidth(15)};
    background-image: url('/svg/search-icon.svg');
  }
`
const StyledInput = styled.input`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(8)};
  padding-right: ${calculateMinSizeBasedOnFigmaWidth(8)};
  border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.SILVER};
  }
`
const StyledSearchResultWrapper = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)} ${calculateMinSizeBasedOnFigmaWidth(8)};
  width: ${calculateMinSizeBasedOnFigmaWidth(270)};
  height: ${calculateMinSizeBasedOnFigmaWidth(200)};
  border: solid 1px ${({ theme }) => theme.COLORS.SILVER};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.BLACK_WHITE};
`
const StyledListItem = styled.li`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)} 0;
`
const StyledAvatar = styled.img`
  box-sizing: border-box;
  object-fit: contain;
  aspect-ratio: 1 / 1;
  width: ${calculateMinSizeBasedOnFigmaWidth(30)};
  height: ${calculateMinSizeBasedOnFigmaWidth(30)};
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
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledSelectedMembersTitle = styled.p`
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`
