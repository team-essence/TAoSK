import { useState, useEffect } from 'react'
import Pixelize from 'utils/pixelize'

type UseConvertToDottedImageReturn = { dottedImage: string }

const toPixel = (ctx: CanvasRenderingContext2D, numOfColors: number): string => {
  const srcData: ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  const dstData: ImageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height)
  const src: Uint8ClampedArray = srcData.data
  const dst: Uint8ClampedArray = dstData.data

  Pixelize.kMeansFilter(src, dst, ctx.canvas.width, ctx.canvas.height, numOfColors)

  const outputImageData = Pixelize.visualizePixel(dstData, 1, false)

  ctx.putImageData(outputImageData, 0, 0)
  const dottedBlobData: Blob = Pixelize.dataURLtoBlob(ctx.canvas.toDataURL())
  return URL.createObjectURL(dottedBlobData)
}

export const useConvertToDottedImage = (
  initialUrl: string,
  numOfColors: number,
  ctx: CanvasRenderingContext2D | undefined,
): UseConvertToDottedImageReturn => {
  const [dottedImage, setDottedImage] = useState<string>(initialUrl)

  useEffect(() => {
    if (!ctx) return
    setDottedImage(toPixel(ctx, numOfColors))
  }, [ctx, numOfColors])

  return { dottedImage }
}
