import { useRef, useEffect, useMemo, useCallback, ComponentProps } from 'react'
import { RESIZED_IMAGE_ASPECT, DEFAULT_USER } from 'consts/defaultImages'
import { useForm, UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { useUpdateUserNameMutation, useUpdateUserIconImageMutation } from 'pages/mypage/mypage.gen'
import { ImageInputField } from 'components/ui/form/ImageInputField'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useImageResize } from 'hooks/useImageResize'
import { useDataUrlToBlob } from 'hooks/useDataUrlToBlob'
import { useBlobToFile } from 'hooks/useBlobToFile'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/lib/azure/azureStorageBlob'
import { collatingImagesInAzure } from 'utils/lib/azure/collatingImagesInAzure'
import toast from 'utils/toast/toast'

type FormInputs = Record<'name' | 'email', string>
type ImageInputFieldProps = ComponentProps<typeof ImageInputField>

type UseAccountSettingFormReturn = {
  register: UseFormRegister<FormInputs>
  setValue: UseFormSetValue<FormInputs>
  errors: FieldErrors<FormInputs>
  currentName: string
  currentEmail: string
  disabledName: boolean
  disabledEmail: boolean
  imageUrl: ImageInputFieldProps['image']
  defaultSrc: ImageInputFieldProps['defaultSrc']
  handleChangeImg: ImageInputFieldProps['handleChangeImg']
  initializeUploadImg: ImageInputFieldProps['initializeUploadImg']
  handleUpdateUserNameMutation: () => void
  handleChangeEmail: () => void
  handleUpdateUserIconImageMutation: NonNullable<ImageInputFieldProps['onClickUploadBtn']>
}

/**
 * react-hook-formを使った登録処理の初期設定を行う
 * @returns {boolean} isDisabled - 登録ボタンをdisabledにするか
 * @returns {Object} {
 *  register,
 *  handleSubmit,
 *  getValues,
 *  errors,
 *  trigger
 *  } - react-hook-fromの公式ページを参照
 */
export const useAccountSettingForm = (): UseAccountSettingFormReturn => {
  const { currentUserData, firebaseCurrentUser } = useGetCurrentUserData()
  const defaultSrc = useMemo(
    () => currentUserData.data?.user.icon_image ?? DEFAULT_USER,
    [currentUserData.data?.user.icon_image],
  )
  const { canvasContext, imageUrl, initializeUploadImg, handleChangeImg } = useImageResize(
    defaultSrc,
    RESIZED_IMAGE_ASPECT,
  )
  const { blobData } = useDataUrlToBlob(canvasContext?.canvas.toDataURL())
  const { fileData } = useBlobToFile(blobData)

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })
  const { name, email } = watch()
  const currentName = useMemo(
    () => currentUserData.data?.user.name ?? '',
    [currentUserData.data?.user.name],
  )
  const currentEmail = useMemo(() => firebaseCurrentUser?.email ?? '', [firebaseCurrentUser?.email])
  const shouldInitialize = useRef<boolean>(true)
  const disabledName = useMemo(
    () => !!errors.name || currentName === name,
    [currentName, errors.name, name],
  )
  const disabledEmail = useMemo(
    () => !!errors.email || currentEmail === email,
    [currentEmail, errors.email, email],
  )
  const [updateUserNameMutation] = useUpdateUserNameMutation({
    onCompleted(data) {
      toast.success('冒険者名を変更しました')
    },
    onError(err) {
      toast.error('冒険者名の変更に失敗しました')
    },
  })
  const [updateUserIconImageMutation] = useUpdateUserIconImageMutation({
    onCompleted(data) {
      toast.success('プロフィール画像を変更しました')
    },
    onError(err) {
      toast.error('プロフィール画像の変更に失敗しました')
    },
  })

  const handleUpdateUserNameMutation = useCallback(() => {
    if (errors.name || !currentUserData.data?.user.id) return
    updateUserNameMutation({
      variables: {
        name,
        id: currentUserData.data.user.id,
      },
    })
  }, [name, errors.name, currentUserData.data?.user.id])

  const handleChangeEmail = useCallback(async () => {
    if (errors.email) return
    await firebaseAuth
      .changeEmail(email)
      .then(() => toast.success('メールアドレスを変更しました'))
      .catch(() => toast.error('メールアドレスの変更に失敗しました'))
  }, [email, errors.email])

  const handleUpdateUserIconImageMutation = useCallback(async () => {
    if (!fileData || !currentUserData.data || imageUrl === currentUserData.data?.user.icon_image)
      return
    const blobsInContainer: string[] = await uploadFileToBlob(fileData)
    const url = await collatingImagesInAzure(fileData, blobsInContainer)
    updateUserIconImageMutation({
      variables: {
        icon_image: url,
        id: currentUserData.data.user.id,
      },
    })
  }, [fileData, imageUrl, currentUserData.data?.user.icon_image])

  useEffect(() => {
    if (shouldInitialize.current && currentName && currentEmail) {
      setValue('name', currentName, { shouldValidate: true })
      setValue('email', currentEmail, { shouldValidate: true })
      shouldInitialize.current = false
    }
  }, [currentName, currentEmail])

  return {
    register,
    errors,
    setValue,
    currentName,
    currentEmail,
    disabledName,
    disabledEmail,
    imageUrl,
    defaultSrc,
    initializeUploadImg,
    handleChangeImg,
    handleUpdateUserNameMutation,
    handleChangeEmail,
    handleUpdateUserIconImageMutation,
  }
}
