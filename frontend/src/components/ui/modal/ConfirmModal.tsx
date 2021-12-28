import React, { FCX, ComponentProps } from 'react'
import styled, { css } from 'styled-components'
import { Modal } from 'components/ui/modal/Modal'
import { ModalButton } from 'components/ui/button/ModalButton'
import { ModalCancelButton } from 'components/ui/button/ModalCancelButton'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type ModalProps = NonNullable<ComponentProps<typeof Modal>>
type Props = { message: string } & Pick<ModalProps, 'title' | 'onClickCloseBtn' | 'shouldShow'>

export const ConfirmModal: FCX<Props> = ({
  title,
  message,
  shouldShow,
  onClickCloseBtn,
  className,
}) => {
  return (
    <StyledModal
      title={title}
      shouldShow={shouldShow}
      onClickCloseBtn={onClickCloseBtn}
      isSmall={true}
      className={className}>
      <StyledContent>
        <StyledMessage>{message}</StyledMessage>
        <StyledButtonWrapper>
          <ModalButton text="はい" />
          <ModalCancelButton text="いいえ" onClick={onClickCloseBtn} />
        </StyledButtonWrapper>
      </StyledContent>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(69)} ${calculateMinSizeBasedOnFigma(26)}
${calculateMinSizeBasedOnFigma(40)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  padding: ${padding};
  width: ${calculateMinSizeBasedOnFigma(692)};
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(40)};
`
const StyledButtonWrapper = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigma(16)};
`
const StyledMessage = styled.p`
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}
`
