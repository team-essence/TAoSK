import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { uploadFileToBlob } from 'utils/azure/azureStorageBlob'
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

  const addUser = (id: string, image: string) => {
    addUserMutation({
      variables: {
        id,
        name,
        icon_image: image,
        company,
        occupation_id: occupationList.indexOf(occupation) + 1,
        context: interests,
        certificationName: certifications,
      },
    })
  }

  const a = async (fileData: File): Promise<string> => {
    const blobsInContainer: string[] = await uploadFileToBlob(fileData)
    const search = fileData.name
    const regexp = new RegExp(search, 'g')
    const url = blobsInContainer.find(i => i.match(regexp))

    return url ? url : DEFAUT_USER
  }

  const trySignUp = () => {
    firebaseAuth.createUser(email, password).then(async result => {
      const b = !fileData ? DEFAUT_USER : await a(fileData)

      await Promise.all([addUser(result.user.uid, b)])
        .then(() => navigate('/'))
        .catch(() => 'err')
    })
  }

  return trySignUp
}
