import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/azure/azureStorageBlob'
import { collatingImagesInAzure } from 'utils/azure/collatingImagesInAzure'
import { occupationList } from 'consts/occupationList'
import { DEFAUT_USER } from 'consts/defaultImages'
import { useAddUserMutation } from 'pages/auth/signUp.gen'

type UseTrySignUp = (
  args: Record<'name' | 'company' | 'occupation' | 'email' | 'password', string> &
    Record<'certifications' | 'interests', string[]> &
    Record<'fileData', File | null>,
) => () => void

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
        occupation_id: occupationList.indexOf(occupation) + 1,
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
