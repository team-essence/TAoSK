import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import { occupationList } from 'consts/occupationList'
import { useAddUserMutation } from '../pages/auth/signUp.gen'

type UserInput = { value: string }
type UseTrySignUp = (
  name: UserInput,
  company: UserInput,
  occupation: UserInput,
  email: UserInput,
  password: UserInput,
) => () => void

export const useTrySignUp: UseTrySignUp = (name, company, occupation, email, password) => {
  const [addUserMutation] = useAddUserMutation()
  const navigate = useNavigate()

  const addUser = (id: string) => {
    addUserMutation({
      variables: {
        id,
        name: name.value,
        icon_image: 'http:aaa',
        company: company.value,
        occupation_id: occupationList.indexOf(occupation.value) + 1,
        context: ['資格1', '資格2', '資格3'],
        qualificationName: ['興味1', '興味2', '興味3'],
      },
    })
  }

  const trySignUp = () => {
    firebaseAuth.createUser(email.value, password.value).then(async result => {
      await Promise.all([addUser(result.user.uid)])
        .then(() => navigate('/'))
        .catch(() => 'err')
    })
  }

  return trySignUp
}
