import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, UseFormRegister, FieldErrors } from 'react-hook-form'
import type { UserDatas } from 'types/userDatas'
import toast from 'utils/toast/toast'
import { useAddTaskMutation } from 'pages/projectList/projectDetail/projectDetail.gen'
import { useAuthContext } from 'providers/AuthProvider'

type StatusCounts = Record<
  'technology' | 'achievement' | 'solution' | 'motivation' | 'design' | 'plan',
  number
>

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>

type UseTaskCreateFormReturn<T> = {
  handleAddTask: () => void
  register: UseFormRegister<T>
  isDisabled: boolean
  errors: FieldErrors
  setStatus: Dispatch<SetStateAction<StatusCounts>>
  setUserDatas: Dispatch<SetStateAction<UserDatas>>
}

type UseTaskCreateForm<T> = (args: {
  verticalSort: number
  list_id: string
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
export const useTaskCreateForm: UseTaskCreateForm<FormInputs> = ({ verticalSort, list_id }) => {
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
  const [status, setStatus] = useState<StatusCounts>({
    technology: 0,
    achievement: 0,
    solution: 0,
    motivation: 0,
    design: 0,
    plan: 0,
  })
  const [userDatas, setUserDatas] = useState<UserDatas>([])
  const [addTask] = useAddTaskMutation({
    onCompleted(data) {
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
    const { technology, achievement, solution, motivation, design, plan } = status
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
      },
    })
  }, [status, userDatas])

  return {
    register,
    isDisabled,
    errors,
    setStatus,
    setUserDatas,
    handleAddTask: handleSubmit(handleAddTask),
  }
}
