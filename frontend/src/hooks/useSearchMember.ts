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
  userIds: string[]
  setUserIds: Dispatch<React.SetStateAction<string[]>>
  userDatas: SearchSameCompanyUsersMutation['searchSameCompanyUsers']
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
    console.log(searchResult)
    const newUserDatas = searchResult.data?.searchSameCompanyUsers
    if (!newUserDatas?.length) {
      setUserDatas([])
      return
    }

    if (JSON.stringify(userDatas) === JSON.stringify(newUserDatas)) return
    setUserDatas(newUserDatas)
  }, [searchResult.data])

  return { onChange, userIds, setUserIds, userDatas }
}
