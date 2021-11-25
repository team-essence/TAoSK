import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { occupationList } from 'consts/occupationList'
import { useAddUserMutation } from 'pages/auth/signUp.gen'

type UseTrySignUp = (
  args: Record<'name' | 'company' | 'occupation' | 'email' | 'password', string> &
    Record<'certifications' | 'interests', string[]>,
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
}) => {
  const [addUserMutation] = useAddUserMutation()
  const navigate = useNavigate()

  const addUser = (id: string) => {
    addUserMutation({
      variables: {
        id,
        name,
        icon_image: 'http:aaa',
        company,
        occupation_id: occupationList.indexOf(occupation) + 1,
        context: interests,
        certificationName: certifications,
      },
    })
  }

  const trySignUp = () => {
    firebaseAuth.createUser(email, password).then(async result => {
      await Promise.all([addUser(result.user.uid)])
        .then(() => navigate('/'))
        .catch(() => 'err')
    })
  }

  return trySignUp
}
