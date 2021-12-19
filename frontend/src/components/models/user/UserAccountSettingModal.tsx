import React, { FCX, Dispatch, SetStateAction } from 'react'
import styled, { css } from 'styled-components'
import { REGEX_EMAIL, REGEX_TEXT } from 'consts/regex'
import { Modal } from 'components/ui/modal/Modal'
import { CancelButton } from 'components/ui/button/CancelButton'
import { CoarseRedOxideButton } from 'components/ui/button/CoarseRedOxideButton'
import { ImageInputField, UPLOAD_BUTTON } from 'components/ui/form/ImageInputField'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useChangeEmailForm } from 'hooks/useAccountSettingForm'
import { useUpdateUserNameForm } from 'hooks/useUpdateUserNameForm'
import { useUpdateUserIconImage } from 'hooks/useUpdateUserIconImage'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
}

export const UserAccountSettingModal: FCX<Props> = ({ shouldShow, setShouldShow, className }) => {
  const { handleChangeEmail, currentEmail, ...emailController } = useChangeEmailForm()
  const { handleUpdateUserNameMutation, ...nameController } = useUpdateUserNameForm()
  const {
    imageUrl,
    defaultSrc,
    handleChangeImg,
    initializeUploadImg,
    shouldDisable,
    handleUpdateUserIconImageMutation,
  } = useUpdateUserIconImage()

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
              {...nameController.register('name', {
                required: '名前は必須です',
                maxLength: { value: 50, message: '50文字以内で入力してください' },
                pattern: {
                  value: REGEX_TEXT,
                  message: '空白が含まれてます',
                },
              })}
              hasError={!!nameController.error}
            />
            <StyledInputBottomRowWrapper>
              <StyledErrorMessage>
                {!!nameController.error && nameController.error.message}
              </StyledErrorMessage>
              <StyledButtonWrapper>
                <CancelButton onClick={nameController.initialize} />
                <CoarseRedOxideButton
                  text="保存"
                  onClick={handleUpdateUserNameMutation}
                  disabled={nameController.disabled}
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
              {...emailController.register('email', {
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
              hasError={!!emailController.error}
            />
            <StyledInputBottomRowWrapper>
              <StyledErrorMessage>
                {!!emailController.error && emailController.error.message}
              </StyledErrorMessage>
              <StyledButtonWrapper>
                <CancelButton onClick={emailController.initialize} />
                <CoarseRedOxideButton
                  text="保存"
                  onClick={handleChangeEmail}
                  disabled={emailController.disabled}
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
            {/* TODO: 未実装。パスワード再設定メール送信処理が出来次第追加する */}
            <StyledSendChangePasswordEmailButton
              text="メールを送信する"
              onClick={() => console.log('hoge')}
            />
          </StyledSendButtonWrapper>
        </StyledLeftColumn>
        <StyledBorder />
        <StyledRightColumn>
          <ImageInputField
            image={imageUrl}
            defaultSrc={defaultSrc}
            handleChangeImg={handleChangeImg}
            onClickUploadBtn={handleUpdateUserIconImageMutation}
            initializeUploadImg={initializeUploadImg}
            uploadButtonType={UPLOAD_BUTTON.MODAL_BUTTON}
            shouldDisabledUploadBtn={shouldDisable}
          />
        </StyledRightColumn>
      </StyledInputsWrapper>
    </StyledModal>
  )
}

const padding = `${calculateMinSizeBasedOnFigma(48)} ${calculateMinSizeBasedOnFigma(
  32,
)} ${calculateMinSizeBasedOnFigma(33)} ${calculateMinSizeBasedOnFigma(27)}` // ts-styled-pluginエラーを避けるため
const StyledModal = styled(Modal)`
  width: ${calculateMinSizeBasedOnFigma(790)};
  height: ${calculateMinSizeBasedOnFigma(539)};
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
  width: ${calculateMinSizeBasedOnFigma(509)};
`
const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: ${calculateMinSizeBasedOnFigma(190)};
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
  height: ${calculateMinSizeBasedOnFigma(40)};
  padding: 0 ${calculateMinSizeBasedOnFigma(13)};
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
  gap: ${calculateMinSizeBasedOnFigma(8)};
  justify-content: flex-end;
`
const StyledSendButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigma(10)};
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
