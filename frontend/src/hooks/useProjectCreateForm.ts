import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form'
import {
  useCreateProjectMutation,
  CreateProjectMutationVariables,
} from 'pages/projectList/projectList.gen'
import toast from 'utils/toast/toast'
import type { RatingProps } from '@mui/material/Rating'
import type { UserData } from 'types/userData'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import logger from 'utils/debugger/logger'

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>
type UserIds = CreateProjectMutationVariables['ids']

type UseProjectCreateFormReturn<T> = {
  handleCreateProject: () => void
  register: UseFormRegister<T>
  isDisabled: boolean
  errors: FieldErrors
  userData: UserData
  difficulty: number
  handleDifficulty: NonNullable<RatingProps['onChange']>
  setUserData: Dispatch<SetStateAction<UserData>>
}

type UseProjectCreateForm<T> = (args: {
  closeModal: () => void
  setCurrentUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>
}) => UseProjectCreateFormReturn<T>

/**
 * プロジェクト作成に関する処理
 */
export const useProjectCreateForm: UseProjectCreateForm<FormInputs> = ({
  closeModal,
  setCurrentUserData,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isComponentMounted = useRef<boolean>(false)
  const watchAllFields = watch()
  const [userData, setUserData] = useState<UserData>([])
  const [difficulty, setDifficulty] = useState<number>(1)
  const [createProject] = useCreateProjectMutation({
    onCompleted(data) {
      setUserData([])
      closeModal()
      setCurrentUserData({ ...data?.createProject })
      toast.success('プロジェクトを作成しました')
    },
    onError(err) {
      logger.debug(err, 'create project error')
      toast.error('プロジェクトの作成に失敗しました')
    },
  })

  const handleDifficulty: NonNullable<RatingProps['onChange']> = (_, value) => {
    if (!value) return
    if (difficulty < 1 || difficulty > 10) {
      setDifficulty(1)
    } else {
      setDifficulty(value)
    }
  }

  const handleCreateProject = useCallback(() => {
    const userIds: UserIds = userData.map(data => data.id)
    const { title, overview, date } = getValues()
    const newDifficulty = difficulty < 1 || difficulty > 10 ? 1 : difficulty

    createProject({
      variables: {
        name: title,
        overview,
        difficulty: newDifficulty,
        end_date: date,
        ids: userIds,
      },
    })
  }, [userData, difficulty])

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('title', '', { shouldValidate: true })
      setValue('overview', '', { shouldValidate: true })
      setValue('date', '', { shouldValidate: true })
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
    difficulty,
    handleDifficulty,
    handleCreateProject: handleSubmit(handleCreateProject),
  }
}
