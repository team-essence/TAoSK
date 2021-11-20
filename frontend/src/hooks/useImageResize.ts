import { useState, ChangeEvent } from 'react'

export type UseImageResizeResult = {
  resizedImageStr: string
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

export const useImageResize = (initialValue: string): UseImageResizeResult => {
  const [resizedImageStr, setResizedImageStr] = useState<string>(initialValue)

  const handleUploadImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return
    const file = e.currentTarget.files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return

    const fileReader = new FileReader()
    const fileImage = new Image()

    const setUrlCreatedFromBlob = (blob: Blob | null) => {
      const resizedUrl = URL.createObjectURL(blob) // blobをimgのsrc属性で使える形へ変換
      setResizedImageStr(resizedUrl) // リサイズした画像を表示
    }

    fileReader.onloadend = () => {
      fileImage.onload = () => {
        const { wantWidth, wantHeight } = calculateWantSize(fileImage.width, fileImage.height, 150)
        const ctx = drawCanvas(fileImage, wantWidth, wantHeight)
        if (!ctx) return
        ctx.canvas.toBlob(setUrlCreatedFromBlob, file.type, 1)
      }

      if (typeof fileReader.result === 'string') fileImage.src = fileReader.result
    }

    fileReader.readAsDataURL(file)
  }

  return { resizedImageStr, handleUploadImg }
}
