import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { Modal } from 'components/ui/modal/Modal'
import { ModalButton } from 'components/ui/button/ModalButton'
import { ItemInputField } from 'components/ui/form/ItemInputField'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  title: string
  shouldShow: boolean
  closeModal: () => void
  items: string[]
  setItems: Dispatch<SetStateAction<string[]>>
  onClickSaveButton: () => void
  disabled: boolean
}

export const MyPageEditTagsModal: FCX<Props> = ({
  title,
  shouldShow,
  closeModal,
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
      onClickCloseBtn={closeModal}
      className={className}>
      <StyledItemInputField
        label={title}
        placeholder={`${title}を追加してください…`}
        items={items}
        setItems={setItems}
      />
      <StyledSaveButton text="保存" onClick={onClickSaveButton} disabled={disabled} />
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigma(640)};
  height: ${calculateMinSizeBasedOnFigma(401)};
  padding: ${calculateMinSizeBasedOnFigma(59)} ${calculateMinSizeBasedOnFigma(80)};
  white-space: pre-line;
`
const StyledItemInputField = styled(ItemInputField)`
  width: 100%;
  input {
    width: ${calculateMinSizeBasedOnFigma(400)};
    height: ${calculateMinSizeBasedOnFigma(66)};
  }
`
const StyledSaveButton = styled(ModalButton)`
  margin: 0 auto;
  width: ${calculateMinSizeBasedOnFigma(160)};
  height: ${calculateMinSizeBasedOnFigma(40)};
`
