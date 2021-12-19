import { useMemo, useCallback, ComponentProps } from 'react'
import { ImageInputField } from 'components/ui/form/ImageInputField'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { RESIZED_IMAGE_ASPECT, DEFAULT_USER } from 'consts/defaultImages'
import { useImageResize } from 'hooks/useImageResize'
import { useDataUrlToBlob } from 'hooks/useDataUrlToBlob'
import { useBlobToFile } from 'hooks/useBlobToFile'
import { uploadFileToBlob } from 'utils/lib/azure/azureStorageBlob'
import { collatingImagesInAzure } from 'utils/lib/azure/collatingImagesInAzure'
import { useUpdateUserIconImageMutation } from 'pages/mypage/mypage.gen'
import toast from 'utils/toast/toast'

type ImageInputFieldProps = NonNullable<ComponentProps<typeof ImageInputField>>

type UseUpdateUserIconImageReturn = {
  imageUrl: ImageInputFieldProps['image']
  defaultSrc: ImageInputFieldProps['defaultSrc']
  handleChangeImg: ImageInputFieldProps['handleChangeImg']
  initializeUploadImg: ImageInputFieldProps['initializeUploadImg']
  shouldDisable: ImageInputFieldProps['shouldDisabledUploadBtn']
  handleUpdateUserIconImageMutation: ImageInputFieldProps['onClickUploadBtn']
}

export const useUpdateUserIconImage = (): UseUpdateUserIconImageReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const [updateUserIconImageMutation] = useUpdateUserIconImageMutation({
    onCompleted(data) {
      toast.success('プロフィール画像を変更しました')
    },
    onError(err) {
      toast.error('プロフィール画像の変更に失敗しました')
    },
  })
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
  const shouldDisable = useMemo(() => defaultSrc === imageUrl, [defaultSrc, imageUrl])

  const handleUpdateUserIconImageMutation = useCallback(async () => {
    if (!fileData || !currentUserData.data || shouldDisable) return
    const blobsInContainer: string[] = await uploadFileToBlob(fileData)
    const url = await collatingImagesInAzure(fileData, blobsInContainer)
    updateUserIconImageMutation({
      variables: {
        icon_image: url,
        id: currentUserData.data.user.id,
      },
    })
  }, [fileData, shouldDisable])

  return {
    imageUrl,
    defaultSrc,
    handleChangeImg,
    initializeUploadImg,
    shouldDisable,
    handleUpdateUserIconImageMutation,
  }
}
