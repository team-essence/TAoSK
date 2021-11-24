import React, { FC, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { REGEX_EMAIL, REGEX_PASSWORD, REGEX_TEXT } from 'consts/regex'
import { DEFAULT_SIGN_UP_IMAGE } from 'consts/defaultSignUpImage'
import { occupationList } from 'consts/occupationList'
import { useNavigateUser } from 'hooks/useNavigateUser'
import { useTrySignUp } from 'hooks/useTrySignUp'
import { useSignUpForm } from 'hooks/useSignUpForm'
import { useWatchInnerAspect } from 'hooks/useWatchInnerAspect'
import { useImageResize } from 'hooks/useImageResize'
import { useConvertToDottedImage } from 'hooks/useConvertToDottedImage'
import { useCreateFile } from 'hooks/useCreateFile'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { ImageInputField } from 'components/ui/form/ImageInputField'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { SelectField } from 'components/ui/form/SelectField'
import { ItemInputField } from 'components/ui/form/ItemInputField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { uploadFileToBlob } from 'utils/azure/azureStorageBlob'

export const SignUp: FC = () => {
  useNavigateUser()
  const { register, handleSubmit, getValues, isDisabled, errors, trigger } = useSignUpForm()
  const [certifications, setCertifications] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const { canvasContext, resizedImageStr, initializeUploadImg, handleUploadImg } = useImageResize(
    DEFAULT_SIGN_UP_IMAGE,
    60,
  )
  const { dottedImage } = useConvertToDottedImage(resizedImageStr, 50, canvasContext)
  const { innerWidth } = useWatchInnerAspect()
  // const { file} = useCreateFile(dottedImage === DEFAULT_SIGN_UP_IMAGE ? '' : dottedImage)
  const trySignUp = useTrySignUp({ ...getValues(), certifications, interests })
  // console.log(dottedImage)

  const t = useCallback(() => {
    const metadata = { type: 'image/jpeg' }
    const file = new File([dottedImage?.blob as Blob], 'test.jpg', metadata)

    return file
  }, [dottedImage])

  // console.log(createFile(dottedImage === DEFAULT_SIGN_UP_IMAGE ? '' : dottedImage))

  const occupationOptions: Record<'value' | 'item', string>[] = occupationList.map(v => {
    return { value: v, item: v }
  })

  occupationOptions.unshift({ value: '', item: '選択' })

  const test = async () => {
    await uploadFileToBlob(t())
  }

  return (
    <>
      <AuthHeader />
      <StyledWrapper>
        <StyledSignUp>
          <StyledLogoImg src={'logo.png'} />
          <StyledH1>新規登録書</StyledH1>
          <button type="submit" onClick={test}>
            Upload!
          </button>
          <StyledFormWrapper>
            <StyledImageInputField
              dottedImage={dottedImage ? dottedImage.URLScheme : ''}
              defaultSrc={DEFAULT_SIGN_UP_IMAGE}
              initializeUploadImg={initializeUploadImg}
              handleUploadImg={handleUploadImg}
              margin={innerWidth <= 1210 ? '0 auto 24px auto' : '0 0 24px 0'}
            />
            <StyledRightColumn margin={innerWidth <= 1210 ? '0 auto 24px auto' : '0 0 24px 0'}>
              <StyledInputField
                label="冒険者"
                registration={register('name', {
                  required: '未入力です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: REGEX_TEXT,
                })}
                error={errors['name']}
              />
              <StyledInputField
                label="会社名"
                registration={register('company', {
                  required: '未入力です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  pattern: REGEX_TEXT,
                })}
                error={errors['company']}
              />
              <StyledInputField
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
                error={errors['email']}
              />
              <StyledPasswordField
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
              <StyledPasswordField
                label="パスワード（確認）"
                registration={register('re-password', {
                  required: '未入力です',
                  validate: value => value === getValues('password') || 'パスワードが一致しません',
                })}
                onChange={() => trigger('password')}
                error={errors['re-password']}
              />
              <StyledSelectField
                label="職種"
                registration={register('occupation', { required: '未選択です' })}
                options={occupationOptions}
                error={errors['occupation']}
              />
              <StyledItemInputField
                label="保有資格"
                items={certifications}
                setItems={setCertifications}
                placeholder={'保有資格を入力してください'}
              />
              <StyledItemInputField
                label="興味のあること"
                items={interests}
                setItems={setInterests}
                placeholder={'興味のあることを入力してください'}
              />

              <StyledTerms>
                下のボタンをクリックすることで、<StyledTermsLink to="">利用規約</StyledTermsLink>と
                <StyledTermsLink to="">プライバシーポリシー</StyledTermsLink>
                の内容に同意したものとみなします。
              </StyledTerms>

              <StyledSignUpButton
                text="登録"
                aspect={{ width: '120px', height: '32px' }}
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
  width: max(58.33vw, 840px);
  height: 100%;
  margin: 26px 0;
  padding: 64px 0;
  background-image: url('contract-paper.png');
  background-size: 100% 100%;
`
const StyledLogoImg = styled.img`
  height: 108px;
`
const StyledH1 = styled.h1`
  margin: 33px 0;
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
  width: min(49.02vw, 706px);
`
const StyledRightColumn = styled.div.attrs<{ margin: string }>(({ margin }) => ({
  margin,
}))<{ margin: string }>`
  margin: ${({ margin }) => margin};
  width: min(33.33vw, 480px);
`
const StyledImageInputField = styled(ImageInputField).attrs<{ margin: string }>(({ margin }) => ({
  margin,
}))<{ margin: string }>`
  margin: ${({ margin }) => margin};
`
const StyledInputField = styled(InputField).attrs(() => ({
  inputStyles: {
    border: `solid 1px ${theme.COLORS.CHOCOLATE}`,
    borderRadius: '2px',
  },
  marginBottom: '24px',
}))``
const StyledPasswordField = styled(PasswordField).attrs(() => ({
  marginBottom: '24px',
}))``
const StyledSelectField = styled(SelectField).attrs(() => ({
  marginBottom: '24px',
}))``
const StyledItemInputField = styled(ItemInputField).attrs(() => ({
  inputAspect: { width: '400px', height: '40px' },
}))`
  margin-bottom: 24px;
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
  margin: 24px 0;
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
