import React, { FC, useState, Dispatch, SetStateAction } from 'react'
import { theme } from 'styles/theme'
import { REGEX_EMAIL, REGEX_TEXT } from 'consts/regex'
import { Modal } from 'components/ui/modal/Modal'
import { TextAreaField } from 'components/ui/form/TextAreaField'
import { InputField } from 'components/ui/form/InputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'
import toast from 'utils/toast/toast'
import {
  calculateMinSizeBasedOnFigmaWidth,
  calculateMinSizeBasedOnFigmaHeight,
} from 'utils/calculateSizeBasedOnFigma'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { useAccountSettingForm } from 'hooks/useAccountSettingForm'
import { useAuthContext } from 'providers/AuthProvider'
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
  className?: string
}

export const UserAccountSettingModal: FC<Props> = ({ shouldShow, setShouldShow, className }) => {
  const { currentUser } = useAuthContext()
  const {
    register,
    handleSubmit,
    getValues,
    isDisabled,
    errors,
    trigger,
    resetEmailEntry,
    resetNameEntry,
  } = useAccountSettingForm()
  const { name, email } = getValues()
  // const isName = REGEX_TEXT.test(name)

  const handleChangeEmail = async () => {
    await firebaseAuth
      .changeEmail(email)
      .then(() => toast.success('送信完了しました'))
      .catch(() => toast.error('送信に失敗しました'))
  }

  const handleChangePassword = async () => {
    await firebaseAuth
      .changePassword(currentUser?.email as string)
      .then(() => toast.success('送信完了しました'))
      .catch(() => toast.error('送信に失敗しました'))
  }

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
              <CoarseButton
                text="保存"
                aspect={{
                  width: calculateMinSizeBasedOnFigmaWidth(64),
                  height: calculateMinSizeBasedOnFigmaWidth(32),
                }}
                outerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
                    : convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)
                }
                innerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
                    : convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)
                }
                color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.BRANDY}
                onClick={() => console.log('aa')}
              />
            </StyledButtonWrapper>
            <StyledH5>メールアドレス</StyledH5>
            <StyledText>{`メールアドレスは${currentUser?.email}です。`}</StyledText>
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
              {/* <StyledCansellButton onClick={resetNameEntry}>キャンセル</StyledCansellButton> */}
              <CoarseButton
                text="送信"
                aspect={{
                  width: calculateMinSizeBasedOnFigmaWidth(64),
                  height: calculateMinSizeBasedOnFigmaWidth(32),
                }}
                outerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
                    : convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)
                }
                innerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
                    : convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)
                }
                color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.BRANDY}
                onClick={handleChangeEmail}
              />
            </StyledButtonWrapper>
            <StyledH5>パスワード再設定</StyledH5>
            <StyledText>
              「送信」を押すと現在登録さているメールアドレスへパスワード変更のメールが送信されます。
            </StyledText>
            <StyledSendButtonWrap>
              <CoarseButton
                text="送信"
                aspect={{
                  width: calculateMinSizeBasedOnFigmaWidth(64),
                  height: calculateMinSizeBasedOnFigmaWidth(32),
                }}
                outerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
                    : convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)
                }
                innerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
                    : convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)
                }
                color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.BRANDY}
                onClick={handleChangePassword}
                isDisabled={false}
              />
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
const StyledCansellButton = styled.button`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  text-decoration-line: underline;
  &:hover {
    opacity: 0.7;
  }
`
const StyledH5 = styled.h5`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
const StyledText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
`
