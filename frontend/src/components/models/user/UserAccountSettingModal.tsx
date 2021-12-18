import React, { FCX, useState, Dispatch, SetStateAction } from 'react'
import { theme } from 'styles/theme'
import { REGEX_EMAIL, REGEX_TEXT } from 'consts/regex'
import { Modal } from 'components/ui/modal/Modal'
import { InputField } from 'components/ui/form/InputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { CancelButton } from 'components/ui/button/CancelButton'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import toast from 'utils/toast/toast'
import {
  calculateMinSizeBasedOnFigma,
  calculateMinSizeBasedOnFigmaWidth,
  calculateMinSizeBasedOnFigmaHeight,
} from 'utils/calculateSizeBasedOnFigma'
import { useAccountSettingForm } from 'hooks/useAccountSettingForm'
import styled, {
  css,
  FlattenInterpolation,
  FlattenSimpleInterpolation,
  ThemeProps,
  DefaultTheme,
} from 'styled-components'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
}

export const UserAccountSettingModal: FCX<Props> = ({ shouldShow, setShouldShow, className }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    isDisabled,
    errors,
    trigger,
    currentName,
    currentEmail,
    handleChangePassword,
  } = useAccountSettingForm()
  // const isName = REGEX_TEXT.test(name)

  return (
    <StyledModal
      title="アカウント設定"
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledFormWrapper>
        <StyledInputsWrapper>
          <StyledLeftColumn>
            <StyledInputField
              label="新しい冒険者名"
              required={true}
              placeholder="お名前を入力してください"
              registration={register('name', {
                required: '名前は必須です',
                maxLength: { value: 50, message: '50文字以内で入力してください' },
              })}
              error={errors['name']}
            />
            <StyledButtonWrapper>
              {/* TODO キャンセルしたときdisabledまで消える りょうがに聞く   */}
              {/* <StyledCansellButton onClick={resetNameEntry}>キャンセル</StyledCansellButton> */}
              <CancelButton
                onClick={() => setValue('name', currentName, { shouldValidate: true })}
              />
              <CoarseRedOxideButton text="保存" onClick={() => console.log('aa')} />
            </StyledButtonWrapper>
            <StyledH5>メールアドレス</StyledH5>
            <StyledText>{`メールアドレスは${currentEmail}です。`}</StyledText>
            <StyledInputField
              label="新しいメールアドレス"
              placeholder="メールアドレスを入力してください"
              registration={register('email', {
                required: '未入力です',
                maxLength: {
                  value: 50,
                  message: '50文字以内で入力してください',
                },
                pattern: {
                  value: REGEX_EMAIL,
                  message: '不正なメールアドレスです',
                },
              })}
              error={errors['email']}
            />
            <StyledButtonWrapper>
              <CancelButton
                onClick={() => setValue('email', currentEmail, { shouldValidate: true })}
              />
              <CoarseRedOxideButton text="保存" onClick={() => console.log('aa')} />
            </StyledButtonWrapper>
            <StyledH5>パスワード再設定</StyledH5>
            <StyledText>
              「送信」を押すと現在登録さているメールアドレスへパスワード変更のメールが送信されます。
            </StyledText>
            <StyledSendButtonWrap>
              <CoarseRedOxideButton text="送信" onClick={handleChangePassword} />
            </StyledSendButtonWrap>
          </StyledLeftColumn>
          <StyledBorder />
          <StyledRightColumn>aaaaa</StyledRightColumn>
        </StyledInputsWrapper>
      </StyledFormWrapper>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: ${calculateMinSizeBasedOnFigmaWidth(790)};
  height: ${calculateMinSizeBasedOnFigmaHeight(709)};
  padding: ${calculateMinSizeBasedOnFigmaHeight(46)} ${calculateMinSizeBasedOnFigmaWidth(26)};
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const StyledInputsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`
const StyledBorder = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
`
const StyledLeftColumn = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(434)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigmaWidth(270)};
  height: 100%;
`
const fieldStyle = (
  inputCss: FlattenSimpleInterpolation,
): FlattenInterpolation<ThemeProps<DefaultTheme>> => css`
  label {
    ${({ theme }) => css`
      color: ${theme.COLORS.TOBACCO_BROWN};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      font-weight: ${theme.FONT_WEIGHTS.SEMIBOLD};
    `}
  }
  input,
  textarea {
    ${inputCss}
    border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
    border-radius: 4px;
    background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
    &::placeholder {
      color: ${({ theme }) => theme.COLORS.SILVER};
    }
  }
`
const StyledInputField = styled(InputField)`
  ${fieldStyle(css`
    width: 100%;
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
    margin: 0;
  `)}
`
const StyledButtonWrapper = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  width: 100%;
  justify-content: flex-end;
  position: relative;
  bottom: ${calculateMinSizeBasedOnFigmaWidth(16)};
`
const StyledSendButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
type Disabled = { disabled?: boolean }
const StyledCoarseButton = styled(CoarseButton).attrs<Disabled>(({ disabled = false }) => ({
  disabled,
}))<Disabled>`
  width: ${calculateMinSizeBasedOnFigma(64)};
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        color: ${theme.COLORS.BRANDY};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
const StyledH5 = styled.h5`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
const StyledText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
