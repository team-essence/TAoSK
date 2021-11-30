import React, { FC, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { Modal } from 'components/ui/modal/Modal'
import { InputField } from 'components/ui/form/InputField'
import { useForm } from 'react-hook-form'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
  className?: string
}

type FormInputs = Record<'title' | 'overview', string>

export const TaskCreateModal: FC<Props> = ({ shouldShow, setShouldShow, className }) => {
  const { register } = useForm<FormInputs>({ mode: 'onChange' })

  return (
    <Modal
      title="タスク作成"
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledInputField
        label="タイトル"
        registration={register('title', {
          required: 'タイトルは必須です',
          maxLength: { value: 255, message: '255文字以内で入力してください' },
        })}
      />
    </Modal>
  )
}

const StyledInputField = styled(InputField)`
  label {
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  }
  input {
    width: ${calculateMinSizeBasedOnFigmaWidth(434)};
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
    border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
    border-radius: 4px;
    background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  }
`
