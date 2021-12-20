import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'
import { env } from 'env/dotEnv'

const containerName = 'haltokyo-container'
const sasToken = env.getAzureStorageApiEndpoint().sasToken
const storageAccountName = env.getAzureStorageApiEndpoint().storageAccountName

/**
 * AzureStorageに接続されているか
 *
 * @return {boolean}
 */
export const isStorageConfigured = () => {
  return !storageAccountName || !sasToken ? false : true
}

/**
 * storageの画像を取得
 *
 * @param {ContainerClient} containerClient
 * @return {*}
 */
const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = []

  for await (const blob of containerClient.listBlobsFlat()) {
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`,
    )
  }

  return returnedBlobUrls
}

/**
 * storageに画像を保存
 *
 * @param {ContainerClient} containerClient
 * @param {File} file
 */
const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  const blobClient = containerClient.getBlockBlobClient(file.name)
  const options = { blobHTTPHeaders: { blobContentType: file.type } }

  await blobClient.uploadData(file, options)
}

/**
 * アップロード完了後に画像を取得
 *
 * @param {File} file
 * @return {*}
 */
export const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return []

  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`,
  )

  const containerClient: ContainerClient = await blobService.getContainerClient(containerName)

  await containerClient.createIfNotExists({
    access: 'container',
  })
  await createBlobInContainer(containerClient, file)

  return getBlobsInContainer(containerClient)
}
