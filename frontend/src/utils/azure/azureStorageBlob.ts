import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { env } from 'env/dotEnv'

const containerName = 'haltokyo-container'
// const sasToken = process.env.REACT_APP_STORAGESASTOKEN
// const storageAccountName = process.env.REACT_APP_STORAGERESOURCENAME
const sasToken = env.getAzureStorageApiEndpoint().sasToken
const storageAccountName = env.getAzureStorageApiEndpoint().storageAccountName

export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true
}

const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = []

  for await (const blob of containerClient.listBlobsFlat()) {
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
    )
  }

  return returnedBlobUrls
}

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  const blobClient = containerClient.getBlockBlobClient(file.name)
  const options = { blobHTTPHeaders: { blobContentType: file.type } }

  await blobClient.uploadData(file, options)
}

export const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return []

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
  )

  const containerClient: ContainerClient = blobService.getContainerClient(containerName)
  await containerClient.createIfNotExists({
    access: 'container',
  })
  await createBlobInContainer(containerClient, file)

  return getBlobsInContainer(containerClient)
}