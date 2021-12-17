import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form'
import {
  useCreateProjectMutation,
  CreateProjectMutationVariables,
} from 'pages/projectList/projectList.gen'
import { useAuthContext } from 'providers/AuthProvider'
import toast from 'utils/toast/toast'
import type { UserData } from 'types/userData'

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>
type UserIds = CreateProjectMutationVariables['ids']

type UseProjectCreateFormReturn<T> = {
  handleCreateProject: () => void
  register: UseFormRegister<T>
  isDisabled: boolean
  errors: FieldErrors
  userData: UserData
  setUserData: Dispatch<SetStateAction<UserData>>
}

type UseProjectCreateForm<T> = (args: { closeModal: () => void }) => UseProjectCreateFormReturn<T>

/**
 * プロジェクト作成に関する処理
 */
export const useProjectCreateForm: UseProjectCreateForm<FormInputs> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const { currentUser } = useAuthContext()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isComponentMounted = useRef<boolean>(false)
  const watchAllFields = watch()
  const [userData, setUserData] = useState<UserData>([])
  const [createProject] = useCreateProjectMutation({
    onCompleted(data) {
      closeModal()
      toast.success('プロジェクトを作成しました')
    },
    onError(err) {
      toast.error('プロジェクトの作成に失敗しました')
    },
  })

  const handleCreateProject = useCallback(() => {
    if (!currentUser) return
    const userIds: UserIds = [currentUser.uid, ...userData.map(data => data.id)]
    const { title, overview, date } = getValues()

    createProject({
      variables: {
        name: title,
        overview,
        difficulty: 1, // TODO: あとで変更する
        end_date: date,
        ids: userIds,
      },
    })
  }, [userData, currentUser])

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('title', '', { shouldValidate: true })
      setValue('overview', '', { shouldValidate: true })
      setValue('date', '')
    }
    const hasError = Object.keys(errors).length
    if (!isComponentMounted.current) {
      initializeInputValues()
      isComponentMounted.current = true
    } else if (hasError) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [watchAllFields, errors])

  return {
    register,
    isDisabled,
    errors,
    userData,
    setUserData,
    handleCreateProject: handleSubmit(handleCreateProject),
  }
}
