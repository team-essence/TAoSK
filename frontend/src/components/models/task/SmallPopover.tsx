import React, { FC } from 'react'
import { PopoverProps } from 'types/popover'
import { theme } from 'styles/theme'
import { BasicPopover } from 'components/ui/modal/BasicPopover'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faEraser } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

type Props = {
  handleEdit: () => void
  handleRemove: () => void
} & PopoverProps

export const SmallPopover: FC<Props> = ({
  anchorEl,
  vertical,
  horizontal,
  handleClose,
  handleEdit,
  handleRemove,
}) => {
  return (
    <BasicPopover
      anchorEl={anchorEl}
      vertical={vertical}
      horizontal={horizontal}
      handleClose={handleClose}>
      <StyledContainer>
        <StyledFlexContainer
          onClick={() => {
            handleEdit(), handleClose()
          }}>
          <StyledFontAwesomeIcon icon={faPencilAlt} />
          <StyledText>編集</StyledText>
        </StyledFlexContainer>
        <StyledFlexContainer
          onClick={() => {
            handleRemove(), handleClose()
          }}>
          <StyledFontAwesomeIcon icon={faEraser} />
          <StyledText>削除</StyledText>
        </StyledFlexContainer>
      </StyledContainer>
    </BasicPopover>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  width: ${calculateMinSizeBasedOnFigmaWidth(120)};
  height: ${calculateMinSizeBasedOnFigmaWidth(75)};
  background: #fffef9;
  border: 1px solid #bbbbbb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(12)};
`
const StyledFlexContainer = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  align-items: center;
  cursor: pointer;
  :hover {
    border-radius: 3px;
    background: ${({ theme }) => theme.COLORS.PEARL_BUSH};
    transition: 0.3s;
  }
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${convertIntoRGBA(theme.COLORS.MINE_SHAFT, 0.6)};
`
const StyledText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${convertIntoRGBA(theme.COLORS.MINE_SHAFT, 0.6)};
`
