import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form'
import toast from 'utils/toast/toast'
import { useAddTaskMutation, AddTaskMutationVariables } from 'pages/projectDetail/projectDetail.gen'
import { useAuthContext } from 'providers/AuthProvider'
import type { UserData } from 'types/userData'
import { StatusParam } from 'types/status'
import { INITIAL_STATUS_COUNTS } from 'consts/status'
import logger from 'utils/debugger/logger'

type StatusCounts = Record<StatusParam, number>
// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>
type UserIds = AddTaskMutationVariables['assignTask']['users']

type UseTaskCreateFormReturn<T> = {
  handleAddTask: () => void
  register: UseFormRegister<T>
  isDisabled: boolean
  errors: FieldErrors<T>
  statusCounts: StatusCounts
  setStatusCounts: Dispatch<SetStateAction<StatusCounts>>
  userData: UserData
  setUserData: Dispatch<SetStateAction<UserData>>
}

type UseTaskCreateForm<T> = (args: {
  verticalSort: number
  list_id: string
  closeModal: () => void
}) => UseTaskCreateFormReturn<T>

/**
 * タスク追加に関する処理
 * @returns {boolean} isDisabled - 登録ボタンをdisabledにするか
 * @returns {Object} {
 *  register,
 *  handleSubmit,
 *  getValues,
 *  errors,
 *  trigger
 *  } - react-hook-fromの公式ページを参照
 */
export const useTaskCreateForm: UseTaskCreateForm<FormInputs> = ({
  verticalSort,
  list_id,
  closeModal,
}) => {
  const { id: projectId } = useParams()
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
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({ ...INITIAL_STATUS_COUNTS })
  const [userData, setUserData] = useState<UserData>([])
  const [addTask] = useAddTaskMutation({
    onCompleted(data) {
      setValue('title', '', { shouldValidate: true })
      setValue('overview', '', { shouldValidate: true })
      setValue('date', '')
      setUserData([])
      setStatusCounts({ ...INITIAL_STATUS_COUNTS })

      closeModal()
      toast.success('タスクを追加しました')
    },
    onError(err) {
      logger.debug(err)
      toast.error('タスクの追加に失敗しました')
    },
  })

  const handleAddTask = useCallback(() => {
    if (!currentUser) return

    const { title, overview, date } = getValues()
    const { technology, achievement, solution, motivation, design, plan } = statusCounts
    const users: UserIds = userData.map(data => ({ user_id: data.id }))

    addTask({
      variables: {
        newTask: {
          title,
          overview,
          technology,
          achievement,
          solution,
          motivation,
          plan,
          design,
          vertical_sort: verticalSort,
          end_date: date,
          project_id: String(projectId),
          list_id: list_id,
          completed_flg: false,
          user_id: currentUser.uid,
        },
        assignTask: {
          users,
        },
      },
    })
  }, [statusCounts, userData, currentUser])

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
    statusCounts,
    setStatusCounts,
    userData,
    setUserData,
    handleAddTask: handleSubmit(handleAddTask),
  }
}
