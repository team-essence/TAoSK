import React, { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_TEXT } from 'consts/regex'
import { SIGN_UP_CAMERA } from 'consts/defaultImages'
import { occupationList } from 'consts/occupationList'
import { useTrySignUp } from 'hooks/useTrySignUp'
import { useSignUpForm } from 'hooks/useSignUpForm'
import { useWatchInnerAspect } from 'hooks/useWatchInnerAspect'
import { useImageResize } from 'hooks/useImageResize'
import { useDataUrlToBlob } from 'hooks/useDataUrlToBlob'
import { useBlobToFile } from 'hooks/useBlobToFile'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { ImageInputField } from 'components/ui/form/ImageInputField'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { SelectField } from 'components/ui/form/SelectField'
import { ItemInputField } from 'components/ui/form/ItemInputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import styled from 'styled-components'
import { theme } from 'styles/theme'

export const SignUp: FC = () => {
  const { register, handleSubmit, getValues, isDisabled, errors, trigger } = useSignUpForm()
  const [certifications, setCertifications] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const { canvasContext, imageUrl, initializeUploadImg, handleUploadImg } = useImageResize(
    SIGN_UP_CAMERA,
    300,
  )
  const { blobData } = useDataUrlToBlob(canvasContext?.canvas.toDataURL())
  const { innerWidth } = useWatchInnerAspect()
  const { fileData } = useBlobToFile(blobData)
  const trySignUp = useTrySignUp({ ...getValues(), certifications, interests, fileData })

  const occupationOptions: Record<'value' | 'item', string>[] = occupationList.map(v => {
    return { value: v, item: v }
  })

  occupationOptions.unshift({ value: '', item: '選択' })

  const inputStyles = {
    border: `solid 1px ${theme.COLORS.CHOCOLATE}`,
    borderRadius: '2px',
  }

  return (
    <>
      <AuthHeader />
      <StyledWrapper>
        <StyledSignUp>
          <StyledLogoImg src="logo.png" alt="TAoSK ロゴ" />
          <StyledH1>新規登録書</StyledH1>
          <StyledFormWrapper>
            <StyledImageInputField
              image={imageUrl}
              defaultSrc={SIGN_UP_CAMERA}
              initializeUploadImg={initializeUploadImg}
              handleUploadImg={handleUploadImg}
              margin={
                innerWidth <= 1210
                  ? `0 auto ${calculateVwBasedOnFigma(24)} auto`
                  : `0 0 ${calculateVwBasedOnFigma(24)} 0`
              }
            />
            <StyledRightColumn
              margin={
                innerWidth <= 1210
                  ? `0 auto ${calculateVwBasedOnFigma(24)} auto`
                  : `0 0 ${calculateVwBasedOnFigma(24)} 0`
              }>
              <InputField
                label="冒険者"
                registration={register('name', {
                  required: '未入力です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: REGEX_TEXT,
                })}
                inputStyles={inputStyles}
                error={errors['name']}
              />
              <InputField
                label="会社名"
                registration={register('company', {
                  required: '未入力です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: REGEX_TEXT,
                })}
                inputStyles={inputStyles}
                error={errors['company']}
              />
              <InputField
                label="メールアドレス"
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
                inputStyles={inputStyles}
                error={errors['email']}
              />
              <PasswordField
                label="パスワード"
                registration={register('password', {
                  required: '未入力です',
                  minLength: {
                    value: 6,
                    message: '6文字以上で入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: {
                    value: REGEX_PASSWORD,
                    message: '半角英数字をそれぞれ1種類以上含めてください',
                  },
                })}
                onChange={() => trigger('re-password')}
                error={errors['password']}
              />
              <PasswordField
                label="パスワード（確認）"
                registration={register('re-password', {
                  required: '未入力です',
                  validate: value => value === getValues('password') || 'パスワードが一致しません',
                })}
                onChange={() => trigger('password')}
                error={errors['re-password']}
              />
              <SelectField
                label="職種"
                registration={register('occupation', { required: '未選択です' })}
                options={occupationOptions}
                error={errors['occupation']}
              />
              <StyledItemInputField
                label="保有資格"
                items={certifications}
                setItems={setCertifications}
                inputAspect={{
                  width: calculateVwBasedOnFigma(400),
                  height: calculateVwBasedOnFigma(40),
                }}
                placeholder="保有資格を入力してください"
              />
              <StyledItemInputField
                label="興味のあること"
                items={interests}
                setItems={setInterests}
                inputAspect={{
                  width: calculateVwBasedOnFigma(400),
                  height: calculateVwBasedOnFigma(40),
                }}
                placeholder="興味のあることを入力してください"
              />

              <StyledTerms>
                下のボタンをクリックすることで、<StyledTermsLink to="">利用規約</StyledTermsLink>と
                <StyledTermsLink to="">プライバシーポリシー</StyledTermsLink>
                の内容に同意したものとみなします。
              </StyledTerms>

              <StyledSignUpButton
                text="登録"
                aspect={{
                  width: calculateVwBasedOnFigma(120),
                  height: calculateVwBasedOnFigma(32),
                }}
                outerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
                    : convertIntoRGBA(theme.COLORS.CHOCOLATE, 0.3)
                }
                innerBgColor={
                  isDisabled
                    ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
                    : convertIntoRGBA(theme.COLORS.ERROR, 0.5)
                }
                color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.TEQUILA}
                isDisabled={isDisabled}
                onClick={handleSubmit(trySignUp)}
              />
            </StyledRightColumn>
          </StyledFormWrapper>
        </StyledSignUp>
        <StyledBackground />
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
  input {
    cursor: url('feather-pen.png') 10 124, pointer;
  }
`
const StyledSignUp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${calculateVwBasedOnFigma(840)};
  height: 100%;
  margin: ${calculateVwBasedOnFigma(26)} 0;
  padding: ${calculateVwBasedOnFigma(64)} 0;
  background-image: url('contract-paper.png');
  background-size: 100% 100%;
`
const StyledLogoImg = styled.img`
  height: ${calculateVwBasedOnFigma(108)};
`
const StyledH1 = styled.h1`
  margin: ${calculateVwBasedOnFigma(33)} 0;
  background: -webkit-linear-gradient(
    top,
    ${({ theme }) => theme.COLORS.TENN},
    ${({ theme }) => theme.COLORS.NERO}
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  width: ${calculateVwBasedOnFigma(706)};
`
const StyledRightColumn = styled.div.attrs<{ margin: string }>(({ margin }) => ({
  margin,
}))<{ margin: string }>`
  margin: ${({ margin }) => margin};
  width: ${calculateVwBasedOnFigma(480)};
`
const StyledImageInputField = styled(ImageInputField).attrs<{ margin: string }>(({ margin }) => ({
  margin,
}))<{ margin: string }>`
  margin: ${({ margin }) => margin};
`
const StyledItemInputField = styled(ItemInputField)`
  margin-bottom: ${calculateVwBasedOnFigma(24)};
`
const StyledBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('register-background.png');
  background-size: cover;
  background-position: 50% 100%;
`
const StyledTerms = styled.p`
  margin: ${calculateVwBasedOnFigma(24)} 0;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.LIGHT};
`
const StyledTermsLink = styled(Link)`
  color: ${({ theme }) => theme.COLORS.BRIGHT_TURQUOISE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
const StyledSignUpButton = styled(CoarseButton)`
  display: block;
  margin: 0 auto;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
`
