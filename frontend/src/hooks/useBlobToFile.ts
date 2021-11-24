import { useState, useEffect } from 'react'

type UseBlobToFileReturn = { fileValue: File | null }

export const useBlobToFile = (blob: Blob | null): UseBlobToFileReturn => {
  const [blobValue, setBlobValue] = useState<Blob | null>(null)
  const [fileValue, setFileValue] = useState<File | null>(null)

  useEffect(() => {
    setBlobValue(blob)
    if (!blobValue) return

    const metaData = { type: 'image/jpeg' }
    const postIndex = Date.now().toString()
    const file = new File([blobValue], `${postIndex}.jpg`, metaData)

    setFileValue(file)
  }, [blob, blobValue])

  return { fileValue }
}
