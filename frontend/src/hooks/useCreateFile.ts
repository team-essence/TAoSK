import { useState, useEffect } from 'react'

export const useCreateFile = (blobURL: string) => {
  const [url, setUrl] = useState<string>(blobURL)
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    setUrl(blobURL)
  }, [blobURL])

  const metadata = { type: 'image/jpeg' }
  setFile(new File([url], 'test.jpg'))

  return { file }
}
