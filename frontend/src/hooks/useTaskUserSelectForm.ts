import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import type { UserDatas } from 'types/userDatas'
import {
  useUnAssignTaskMutation,
  useCreateAllocationMutation,
} from 'pages/projectDetail/projectDetail.gen'

type UseTaskUserSelectFormReturn = {
  userDatas: UserDatas
  setUserDatas: Dispatch<SetStateAction<UserDatas>>
}

type UseTaskUserSelectForm = {
  (arg: { id: string; initialUserDatas: UserDatas }): UseTaskUserSelectFormReturn
}

export const useTaskUserSelectForm: UseTaskUserSelectForm = ({ id, initialUserDatas }) => {
  const [userDatas, setUserDatas] = useState<UserDatas>([...initialUserDatas])
  const preUserDatas = useRef<UserDatas>([...initialUserDatas])
  const [unAssignTaskMutation] = useUnAssignTaskMutation()
  const [createAllocationMutation] = useCreateAllocationMutation()

  useEffect(() => {
    const { type, diff } = getDiffUserDatas(userDatas, preUserDatas.current)
    if (!diff) return

    if (type === 'added') {
      createAllocationMutation({
        variables: {
          newAllocation: {
            user_id: diff.id,
            task_id: id,
          },
        },
      })
    } else {
      unAssignTaskMutation({
        variables: {
          taskId: Number(id),
          userId: diff.id,
        },
      })
    }

    preUserDatas.current = [...userDatas]
  }, [userDatas])

  return { userDatas, setUserDatas }
}

type DiffType = 'added' | 'removed' | 'nothing'
type GetDiffUserDatasReturn = {
  type: DiffType
  diff?: UserDatas[number]
}
const getDiffUserDatas = (newDatas: UserDatas, preDatas: UserDatas): GetDiffUserDatasReturn => {
  const jsonNewDatasArray = newDatas.map(v => JSON.stringify(v))
  const jsonPreDatasArray = preDatas.map(v => JSON.stringify(v))
  const type: DiffType = (() => {
    if (newDatas.length > preDatas.length) return 'added'
    if (newDatas.length < preDatas.length) return 'removed'
    return 'nothing'
  })()

  if (type === 'added') {
    for (let i = 0; i < jsonNewDatasArray.length; i++) {
      const value = jsonNewDatasArray[i]
      if (!jsonPreDatasArray.includes(value)) {
        return { type, diff: JSON.parse(value) }
      }
    }
  } else if (type === 'removed') {
    for (let i = 0; i < jsonPreDatasArray.length; i++) {
      const value = jsonPreDatasArray[i]
      if (!jsonNewDatasArray.includes(value)) {
        return { type, diff: JSON.parse(value) }
      }
    }
  }

  return { type }
}
