import { DEFAUT_USER } from 'consts/defaultImages'

export const collatingImagesInAzure = async (
  fileData: File,
  blobsInContainer: string[],
): Promise<string> => {
  const search = fileData.name
  const regexp = new RegExp(search, 'g')
  const url = blobsInContainer.find(i => i.match(regexp))

  return url ? url : DEFAUT_USER
}
