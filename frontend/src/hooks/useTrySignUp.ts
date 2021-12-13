import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/lib/azure/azureStorageBlob'
import { collatingImagesInAzure } from 'utils/lib/azure/collatingImagesInAzure'
import { occupationList } from 'consts/occupationList'
import { DEFAUT_USER } from 'consts/defaultImages'
import { useAddUserMutation } from 'pages/auth/signUp.gen'

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
    firebaseAuth.createUser(email, password).then(async result => {
      const blobsInContainer: string[] = await uploadFileToBlob(fileData)
      const url = !fileData ? DEFAUT_USER : await collatingImagesInAzure(fileData, blobsInContainer)

      await Promise.all([addUser(result.user.uid, url)])
        .then(() => navigate('/'))
        .catch(() => 'err')
    })
  }

  return trySignUp
}
