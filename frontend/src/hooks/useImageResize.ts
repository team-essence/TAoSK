import { useState, useEffect, ChangeEvent } from 'react'

export type UseImageResizeReturn = {
  canvasContext: CanvasRenderingContext2D | undefined
  imageUrl: string
  initializeUploadImg: () => void
  handleUploadImg: (e: ChangeEvent<HTMLInputElement>) => void
}

const calculateWantSize = (
  uploadWidth: number,
  uploadHeight: number,
  maxWidth: number,
): Record<'wantWidth' | 'wantHeight', number> => {
  const wantWidth = uploadWidth < maxWidth ? uploadWidth : maxWidth
  const resizeRatio = uploadWidth / wantWidth
  const wantHeight = uploadHeight / resizeRatio

  return { wantWidth, wantHeight }
}

const drawCanvas = (
  image: HTMLImageElement,
  width: number,
  height: number,
): CanvasRenderingContext2D | undefined => {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (ctx === null) return
  ctx.drawImage(image, 0, 0, width, height)

  return ctx
}

/**
 * 第二引数に指定したwidthを基準にアスペクト比を守って縮小処理を行い、画像のリサイズを行う
 * @param {string} initialUrl - imgタグのsrcに指定する初期値
 * @param {number} maxWidth - ここで指定したwidth以下になるようにリサイズをする
 * @return {UseImageResizeReturn} {
 * canvasContext: リサイズした画像をdrawしたcanvasのコンテキスト,
 * imageUrl: リサイズ後のurl,
 * initializeUploadImg: imageUrlを第一引数に設定した初期値に戻す,
 * handleUploadImg: input[type="file"]でファイルが変更された時にリサイズ処理を実行する
 * }
 */
export const useImageResize = (initialUrl: string, maxWidth: number): UseImageResizeReturn => {
  const [imageUrl, setImageUrl] = useState<string>(initialUrl)
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()

  const initializeUploadImg = () => setImageUrl(initialUrl)

  const setUrlCreatedFromBlob = (blob: Blob | null) => {
    if (!blob) return
    const resizedUrl = URL.createObjectURL(blob) // blobをimgのsrc属性で使える形へ変換
    setImageUrl(resizedUrl) // リサイズした画像を表示
  }

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return
    const file = e.currentTarget.files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    const fileReader = new FileReader()
    const fileImage = new Image()

    fileReader.onloadend = () => {
      fileImage.onload = () => {
        const { wantWidth, wantHeight } = calculateWantSize(
          fileImage.width,
          fileImage.height,
          maxWidth,
        )
        const ctx = drawCanvas(fileImage, wantWidth, wantHeight)
        if (!ctx) return
        ctx.canvas.toBlob(setUrlCreatedFromBlob, file.type, 1)
        setCanvasContext(ctx)
      }

      if (typeof fileReader.result === 'string') fileImage.src = fileReader.result
    }

    fileReader.readAsDataURL(file)
  }

  useEffect(() => setImageUrl(initialUrl), [initialUrl])

  return { canvasContext, imageUrl, initializeUploadImg, handleUploadImg }
}
