import { useState, useEffect } from 'react'
import Pixelize from 'utils/pixelize'

type UseDataUrlToBlobReturn = { blobData: Blob | null }

/**
 * blob:urlからBlobへ変換
 *
 * @param {string} url
 * @return {Blob | null} fileData
 */
export const useDataUrlToBlob = (url: string | undefined): UseDataUrlToBlobReturn => {
  const [dataUrl, setDataUrl] = useState<string | undefined>()
  const [blobData, setBlobData] = useState<Blob | null>(null)

  useEffect(() => {
    setDataUrl(url)
    if (!dataUrl) return
    setBlobData(Pixelize.dataURLtoBlob(dataUrl))
  }, [dataUrl, url])

  return { blobData }
}
