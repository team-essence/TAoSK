export const createFile = async (blob: string) => {
  // const response = await fetch(url)
  // const data = await response.blob()
  const metadata = { type: 'image/jpeg' }
  const file = new File([blob], 'test.jpg', metadata)

  return file
}
