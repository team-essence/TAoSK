import { useState, useEffect } from 'react'

type UseBlobToFileReturn = { fileData: File | null }

/**
 * BlobからFileへ変換
 *
 * @param {Blob | null} blob
 * @return {File | null} fileData
 */
export const useBlobToFile = (blob: Blob | null): UseBlobToFileReturn => {
  const [blobData, setBlobData] = useState<Blob | null>(null)
  const [fileData, setFileData] = useState<File | null>(null)

  useEffect(() => {
    setBlobData(blob)
    if (!blobData) return

    const metaData = { type: 'image/jpeg' }
    const postIndex = Date.now().toString()
    const file = new File([blobData], `${postIndex}.jpg`, metaData)

    setFileData(file)
  }, [blob, blobData])

  return { fileData }
}
