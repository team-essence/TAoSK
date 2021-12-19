import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/lib/azure/azureStorageBlob'
import { collatingImagesInAzure } from 'utils/lib/azure/collatingImagesInAzure'
import { DEFAULT_USER } from 'consts/defaultImages'
import { useAddUserMutation } from 'pages/auth/signUp.gen'
import logger from 'utils/debugger/logger'
import { FIREBASE_ERROR_TYPE } from 'consts/firebaseError'
import toast from 'utils/toast/toast'

type UseTrySignUp = (
  args: Record<'name' | 'company' | 'occupation' | 'email' | 'password', string> &
    Record<'certifications' | 'interests', string[]> &
    Record<'fileData', File | null>,
) => () => void

/**
 * Firebaseで登録処理を行なったのち、DBにユーザーを追加する関数を返す
 * @param {*} {
 *   name,
 *   company,
 *   occupation,
 *   email,
 *   password,
 *   certifications,
 *   interests,
 * }
 * @return {() => void} trySignUp()
 */
export const useTrySignUp: UseTrySignUp = ({
  name,
  company,
  occupation,
  email,
  password,
  certifications,
  interests,
  fileData,
}) => {
  const [addUserMutation] = useAddUserMutation()
  const navigate = useNavigate()

  const addUser = (id: string, url: string) => {
    addUserMutation({
      variables: {
        id,
        name,
        icon_image: url,
        company,
        occupation_id: Number(occupation),
        context: interests,
        certificationName: certifications,
      },
    })
  }

  const trySignUp = () => {
    firebaseAuth
      .createUser(email, password)
      .then(async result => {
        const blobsInContainer: string[] = await uploadFileToBlob(fileData)
        const url = !fileData
          ? DEFAULT_USER
          : await collatingImagesInAzure(fileData, blobsInContainer)

        await Promise.all([addUser(result.user.uid, url)])
          .then(() => navigate('/'))
          .catch(() => 'err')
      })
      .catch(err => {
        logger.debug(err)
        // TODO: 追加される可能性あり
        switch (err.code) {
          case FIREBASE_ERROR_TYPE.AUTH_EMAIL_ALREADY_IN_USE:
            toast.error('既に使用されているメールアドレスです')
            break

          default:
            break
        }
      })
  }

  return trySignUp
}
