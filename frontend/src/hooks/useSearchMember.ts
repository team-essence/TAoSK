import { useState, useEffect, Dispatch } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useInput } from 'hooks/useInput'
import {
  useSearchSameCompanyUsersMutation,
  SearchSameCompanyUsersMutation,
} from 'pages/projectList/projectList.gen'

export type UseSearchMemberReturn = {
  onChange: ReturnType<typeof useInput>['onChange']
  onFocus: () => void
  onBlur: () => void
  userIds: string[]
  setUserIds: Dispatch<React.SetStateAction<string[]>>
  userDatas: SearchSameCompanyUsersMutation['searchSameCompanyUsers']
  shouldShowResult: boolean
}

export const useSearchMember = (): UseSearchMemberReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const { value, onChange } = useInput('')
  const [userIds, setUserIds] = useState<string[]>([])
  const debouncedInputText = useDebounce<string>(value, 500)
  const [searchSameCompanyUsers, searchResult] = useSearchSameCompanyUsersMutation()
  const [userDatas, setUserDatas] = useState<
    SearchSameCompanyUsersMutation['searchSameCompanyUsers']
  >([])
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false)
  const onFocus = () => setShouldShowResult(true)
  const onBlur = () => setShouldShowResult(false)

  useEffect(() => {
    if (!debouncedInputText) {
      setUserDatas([])
      return
    }
    searchSameCompanyUsers({
      variables: {
        selectUserIds: userIds,
        name: debouncedInputText,
        company: currentUserData.data?.user.company ? currentUserData.data.user.company : '',
      },
    })
  }, [debouncedInputText])

  useEffect(() => {
    console.log(searchResult) // TODO: デバッグ用。後で消す
    const newUserDatas = searchResult.data?.searchSameCompanyUsers
    if (!newUserDatas?.length) {
      setUserDatas([])
      return
    }

    if (JSON.stringify(userDatas) === JSON.stringify(newUserDatas)) return
    setUserDatas(newUserDatas)
  }, [searchResult.data])

  return { onChange, onFocus, onBlur, userIds, setUserIds, userDatas, shouldShowResult }
}
