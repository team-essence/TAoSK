import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form'
import type { UserDatas } from 'types/userDatas'
import toast from 'utils/toast/toast'
import { useAddTaskMutation } from 'pages/projectDetail/projectDetail.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { StatusParam } from 'types/status'

type StatusCounts = Record<StatusParam, number>

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>

type UseTaskCreateFormReturn<T> = {
  handleAddTask: () => void
  register: UseFormRegister<T>
  isDisabled: boolean
  errors: FieldErrors
  setStatusCounts: Dispatch<SetStateAction<StatusCounts>>
  userDatas: UserDatas
  setUserDatas: Dispatch<SetStateAction<UserDatas>>
}

type UseTaskCreateForm<T> = (args: {
  verticalSort: number
  list_id: string
  closeModal: () => void
}) => UseTaskCreateFormReturn<T>

/**
 * タスク追加処理の初期設定を行う
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
  const initialStatusCounts = {
    technology: 0,
    achievement: 0,
    solution: 0,
    motivation: 0,
    design: 0,
    plan: 0,
  }
  const [statusCounts, setStatusCounts] = useState<StatusCounts>(initialStatusCounts)
  const [userDatas, setUserDatas] = useState<UserDatas>([])
  const [addTask] = useAddTaskMutation({
    onCompleted(data) {
      setValue('title', '', { shouldValidate: true })
      setValue('overview', '', { shouldValidate: true })
      setValue('date', '')
      setUserDatas([])
      setStatusCounts(initialStatusCounts)

      closeModal()
      toast.success('タスクを作成しました')
    },
    onError(err) {
      toast.error('タスクの作成失敗しました')
    },
  })

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

  const handleAddTask = useCallback(() => {
    if (!currentUser) return

    const { title, overview, date } = getValues()
    const { technology, achievement, solution, motivation, design, plan } = statusCounts
    const users = userDatas.map(data => {
      return { user_id: data.id }
    })
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
  }, [statusCounts, userDatas])

  return {
    register,
    isDisabled,
    errors,
    setStatusCounts,
    userDatas,
    setUserDatas,
    handleAddTask: handleSubmit(handleAddTask),
  }
}
