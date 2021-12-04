import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
} from 'react-hook-form'
import { SearchSameCompanyUsersMutation } from 'pages/projectList/projectList.gen'

type StatusCounts = Record<
  'technology' | 'achievement' | 'solution' | 'motivation' | 'design' | 'plan',
  number
>
type UserDatas = SearchSameCompanyUsersMutation['searchSameCompanyUsers']

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>

type UseTaskCreateFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
  errors: FieldErrors
  setStatus: Dispatch<SetStateAction<StatusCounts>>
  setUserDatas: Dispatch<SetStateAction<UserDatas>>
}

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
export const useTaskCreateForm = (): UseTaskCreateFormReturn<FormInputs> => {
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
  const [status, setStatus] = useState<StatusCounts>({
    technology: 0,
    achievement: 0,
    solution: 0,
    motivation: 0,
    design: 0,
    plan: 0,
  })
  const [userDatas, setUserDatas] = useState<UserDatas>([])

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

  return { register, handleSubmit, getValues, isDisabled, errors, setStatus, setUserDatas }
}
