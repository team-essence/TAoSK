import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import type { UserData } from 'types/userData'
import {
  useUnAssignTaskMutation,
  useCreateAllocationMutation,
} from 'pages/projectDetail/projectDetail.gen'

type UseTaskUserSelectFormReturn = {
  userData: UserData
  setUserData: Dispatch<SetStateAction<UserData>>
}

type UseTaskUserSelectForm = {
  (arg: { id: string; initialUserData: UserData }): UseTaskUserSelectFormReturn
}

/**
 * タスク編集モーダルで、ユーザーのアサイン、アンアサイン処理を行うためのフック
 */
export const useTaskUserSelectForm: UseTaskUserSelectForm = ({ id, initialUserData }) => {
  const [userData, setUserData] = useState<UserData>([...initialUserData])
  const preUserData = useRef<UserData>([...initialUserData])
  const [unAssignTaskMutation] = useUnAssignTaskMutation()
  const [createAllocationMutation] = useCreateAllocationMutation()

  useEffect(() => {
    const { type, diff } = getDiffUserData(userData, preUserData.current)
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

    preUserData.current = [...userData]
  }, [userData])

  return { userData, setUserData }
}

type DiffType = 'added' | 'removed' | 'nothing'
type GetDiffUserDataReturn = {
  type: DiffType
  diff?: UserData[number]
}
const getDiffUserData = (newData: UserData, preData: UserData): GetDiffUserDataReturn => {
  const jsonNewDataArray = newData.map(v => JSON.stringify(v))
  const jsonPreDataArray = preData.map(v => JSON.stringify(v))
  const type: DiffType = (() => {
    if (newData.length > preData.length) return 'added'
    if (newData.length < preData.length) return 'removed'
    return 'nothing'
  })()

  if (type === 'added') {
    for (const value of jsonNewDataArray) {
      if (!jsonPreDataArray.includes(value)) {
        return { type, diff: JSON.parse(value) }
      }
    }
  } else if (type === 'removed') {
    for (const value of jsonPreDataArray) {
      if (!jsonNewDataArray.includes(value)) {
        return { type, diff: JSON.parse(value) }
      }
    }
  }

  return { type }
}
