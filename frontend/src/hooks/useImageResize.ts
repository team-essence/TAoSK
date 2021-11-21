import { useState, ChangeEvent } from 'react'

export type UseImageResizeReturn = {
  canvasContext: CanvasRenderingContext2D | undefined
  resizedImageStr: string
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

export const useImageResize = (initialUrl: string, maxWidth: number): UseImageResizeReturn => {
  const [resizedImageStr, setResizedImageStr] = useState<string>(initialUrl)
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D>()

  const initializeUploadImg = () => {
    setResizedImageStr(initialUrl)
  }

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

  return { canvasContext, resizedImageStr, initializeUploadImg, handleUploadImg }
}
