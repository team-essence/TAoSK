import React, { FCX, Dispatch, SetStateAction } from 'react'
import { REGEX_EMAIL, REGEX_TEXT } from 'consts/regex'
import { Modal } from 'components/ui/modal/Modal'
import { CancelButton } from 'components/ui/button/CancelButton'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import {
  calculateMinSizeBasedOnFigma,
  calculateMinSizeBasedOnFigmaWidth,
  calculateMinSizeBasedOnFigmaHeight,
} from 'utils/calculateSizeBasedOnFigma'
import { useAccountSettingForm } from 'hooks/useAccountSettingForm'
import styled, { css } from 'styled-components'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
}

export const UserAccountSettingModal: FCX<Props> = ({ shouldShow, setShouldShow, className }) => {
  const {
    register,
    setValue,
    errors,
    currentName,
    currentEmail,
    disabledName,
    disabledEmail,
    handleChangeEmail,
    handleChangePassword,
  } = useAccountSettingForm()

  return (
    <StyledModal
      title="アカウント設定"
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <StyledInputsWrapper>
        <StyledLeftColumn>
          <StyledInputWrapper>
            <StyledH5>冒険者名</StyledH5>
            <StyledInput
              placeholder="お名前を入力してください"
              {...register('name', {
                required: '名前は必須です',
                maxLength: { value: 50, message: '50文字以内で入力してください' },
                pattern: {
                  value: REGEX_TEXT,
                  message: '空白が含まれてます',
                },
              })}
              hasError={!!errors.name?.message}
            />
            <StyledInputBottomRowWrapper>
              <StyledErrorMessage>
                {!!errors.name?.message && errors.name.message}
              </StyledErrorMessage>
              <StyledButtonWrapper>
                <CancelButton
                  onClick={() => setValue('name', currentName, { shouldValidate: true })}
                />
                <CoarseRedOxideButton
                  text="保存"
                  onClick={() => console.log('aa')}
                  disabled={disabledName}
                />
              </StyledButtonWrapper>
            </StyledInputBottomRowWrapper>
          </StyledInputWrapper>

          <StyledTextWrapper>
            <StyledH5>メールアドレス</StyledH5>
            <StyledText>{`メールアドレスは${currentEmail}です。`}</StyledText>
          </StyledTextWrapper>
          <StyledInputWrapper>
            <StyledH5>新しいメールアドレス</StyledH5>
            <StyledInput
              placeholder="メールアドレスを入力してください"
              {...register('email', {
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
              hasError={!!errors.email?.message}
            />
            <StyledInputBottomRowWrapper>
              <StyledErrorMessage>
                {!!errors.email?.message && errors.email.message}
              </StyledErrorMessage>
              <StyledButtonWrapper>
                <CancelButton
                  onClick={() => setValue('email', currentEmail, { shouldValidate: true })}
                />
                <CoarseRedOxideButton
                  text="保存"
                  onClick={() => console.log('aa')}
                  disabled={disabledEmail}
                />
              </StyledButtonWrapper>
            </StyledInputBottomRowWrapper>
          </StyledInputWrapper>

          <StyledTextWrapper>
            <StyledH5>パスワード再設定</StyledH5>
            <StyledText>
              「送信」を押すと現在登録さているメールアドレスへパスワード変更のメールが送信されます。
            </StyledText>
          </StyledTextWrapper>
          <StyledSendButtonWrapper>
            <StyledSendChangePasswordEmailButton
              text="メールを送信する"
              onClick={handleChangePassword}
            />
          </StyledSendButtonWrapper>
        </StyledLeftColumn>
        <StyledBorder />
        <StyledRightColumn>aaaaa</StyledRightColumn>
      </StyledInputsWrapper>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigmaHeight(48)} ${calculateMinSizeBasedOnFigmaWidth(
  32,
)} ${calculateMinSizeBasedOnFigma(33)} ${calculateMinSizeBasedOnFigmaWidth(27)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  width: ${calculateMinSizeBasedOnFigmaWidth(790)};
  height: ${calculateMinSizeBasedOnFigmaHeight(539)};
  padding: ${padding};
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${calculateMinSizeBasedOnFigmaWidth(509)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigmaWidth(190)};
  height: 100%;
`
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigma(8)};
  width: 100%;
  min-height: 0;
`
const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  border-radius: 4px;
  ${({ theme, hasError }) =>
    css`
      border: solid 1px ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
      background-color: ${convertIntoRGBA(theme.COLORS.WHITE, 0.84)};
      border-color: ${hasError ? theme.COLORS.ERROR : 'none'};
      color: ${theme.COLORS.TOBACCO_BROWN};
      &::placeholder {
        color: ${theme.COLORS.SILVER};
      }
    `}
`
const StyledInputBottomRowWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StyledErrorMessage = styled.p`
  ${({ theme }) =>
    css`
      color: ${theme.COLORS.ERROR};
      font-size: ${theme.FONT_SIZES.SIZE_14};
    `}
`
const StyledButtonWrapper = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  justify-content: flex-end;
`
const StyledSendButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const StyledTextWrapper = styled.p`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(10)};
`
const StyledH5 = styled.h5`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
const StyledText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
const StyledSendChangePasswordEmailButton = styled(CoarseRedOxideButton)`
  width: ${calculateMinSizeBasedOnFigma(144)};
`
