import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { occupationList } from 'consts/occupationList'
import { useAddUserMutation } from 'pages/auth/signUp.gen'

type UseTrySignUp = (
  args: Record<'name' | 'company' | 'occupation' | 'email' | 'password', string>,
) => () => void

export const useTrySignUp: UseTrySignUp = ({ name, company, occupation, email, password }) => {
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
        context: ['資格1', '資格2', '資格3'],
        certificationName: ['興味1', '興味2', '興味3'],
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
