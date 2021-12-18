import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import { Modal } from 'components/ui/modal/Modal'
import { ModalButton } from 'components/ui/button/ModalButton'
import { ItemInputField } from 'components/ui/form/ItemInputField'
import { TAG_TYPE } from 'components/ui/tag/Tag'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  title: string
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
  items: string[]
  setItems: Dispatch<SetStateAction<string[]>>
  onClickSaveButton: () => void
  disabled: boolean
}

export const MyPageEditTagsModal: FCX<Props> = ({
  title,
  shouldShow,
  setShouldShow,
  items,
  setItems,
  onClickSaveButton,
  disabled,
  className,
}) => {
  return (
    <StyledModal
      title={title}
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledItemInputField
        label={title}
        placeholder={`${title}を追加してください…`}
        items={items}
        setItems={setItems}
        tagType={TAG_TYPE.NORMAL}
      />
      <StyledSaveButton text="保存" onClick={onClickSaveButton} disabled={disabled} />
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(59)} ${calculateMinSizeBasedOnFigma(80)}
${calculateMinSizeBasedOnFigma(17)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigma(17)};
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(640)};
  height: ${calculateMinSizeBasedOnFigma(401)};
  padding: ${padding};
  white-space: pre-line;
`
const StyledItemInputField = styled(ItemInputField)`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(267)};
  > :last-child {
    overflow-y: scroll;
    max-height: ${calculateMinSizeBasedOnFigma(180)};

    ${({ theme }) =>
      // スクロールバーを常に表示
      css`
        &::-webkit-scrollbar {
          -webkit-appearance: none;
          width: 7px;
        }
        &::-webkit-scrollbar-thumb {
          border-radius: 4px;
          background-color: ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
          box-shadow: 0 0 1px ${convertIntoRGBA(theme.COLORS.WHITE, 0.2)};
        }
      `}
  }

  & input {
    width: ${calculateMinSizeBasedOnFigma(400)};
    height: ${calculateMinSizeBasedOnFigma(40)};
  }
`
const StyledSaveButton = styled(ModalButton)`
  margin: 0 auto;
  width: ${calculateMinSizeBasedOnFigma(160)};
  height: ${calculateMinSizeBasedOnFigma(40)};
`
