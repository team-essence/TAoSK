import { useState, useEffect } from 'react'
import Pixelize from 'utils/pixelize'

type DottedImage = { URLScheme: string; blob: Blob | null }
type UseConvertToDottedImageReturn = { dottedImage: DottedImage }

const toPixel = (ctx: CanvasRenderingContext2D, numOfColors: number) => {
  const srcData: ImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
  const dstData: ImageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height)
  const src: Uint8ClampedArray = srcData.data
  const dst: Uint8ClampedArray = dstData.data

  Pixelize.kMeansFilter(src, dst, ctx.canvas.width, ctx.canvas.height, numOfColors)

  const outputImageData = Pixelize.visualizePixel(dstData, 1, false)

  ctx.putImageData(outputImageData, 0, 0)
  const dottedBlobData: Blob = Pixelize.dataURLtoBlob(ctx.canvas.toDataURL())
  return {
    URLScheme: URL.createObjectURL(dottedBlobData),
    blob: dottedBlobData,
  }
}

/**
 * 画像をドット化する
 * @param {string} initialUrl - imgタグのsrcに指定する初期値
 * @param {number} numOfColors - 生成するドット絵の色数を指定
 * @param {(CanvasRenderingContext2D | undefined)} ctx - ドット化したい画像がdrawされたcanvasコンテキスト
 * @return {Object} { dottedImage } - ドット化された画像URL
 */
export const useConvertToDottedImage = (
  initialUrl: string,
  numOfColors: number,
  ctx: CanvasRenderingContext2D | undefined,
): UseConvertToDottedImageReturn => {
  const [dottedImage, setDottedImage] = useState<DottedImage>({
    URLScheme: initialUrl,
    blob: null,
  })

  useEffect(() => {
    setDottedImage(state => ({ ...state, URLScheme: initialUrl }))
  }, [initialUrl])

  useEffect(() => {
    if (!ctx) return
    setDottedImage(toPixel(ctx, numOfColors))
  }, [ctx, numOfColors])

  return { dottedImage }
}
