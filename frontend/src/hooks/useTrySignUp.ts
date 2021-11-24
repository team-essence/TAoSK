import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/azure/azureStorageBlob'
import { occupationList } from 'consts/occupationList'
import { useAddUserMutation } from 'pages/auth/signUp.gen'

type UseTrySignUp = (
  args: Record<'name' | 'company' | 'occupation' | 'email' | 'password', string> &
    Record<'certifications' | 'interests', string[]>,
) => () => void

export const useTrySignUp: UseTrySignUp = ({
  name,
  company,
  occupation,
  email,
  password,
  certifications,
  interests,
  // file,
}) => {
  const [addUserMutation] = useAddUserMutation()
  const navigate = useNavigate()

  const addUser = (id: string) => {
    addUserMutation({
      variables: {
        id,
        name,
        icon_image: 'a',
        company,
        occupation_id: occupationList.indexOf(occupation) + 1,
        context: interests,
        certificationName: certifications,
      },
    })
  }

  const trySignUp = () => {
    firebaseAuth.createUser(email, password).then(async result => {
      // const blobsInContainer: string[] =
      // await uploadFileToBlob(file)
      await Promise.all([addUser(result.user.uid)])
        .then(() => navigate('/'))
        .catch(() => 'err')
    })
  }

  return trySignUp
}
