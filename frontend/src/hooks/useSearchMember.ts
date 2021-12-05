import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useInput } from 'hooks/useInput'
import {
  useSearchSameCompanyUsersMutation,
  SearchSameCompanyUsersMutation,
} from 'pages/projectList/projectList.gen'

type UserDatas = SearchSameCompanyUsersMutation['searchSameCompanyUsers']

type UseSearchMemberReturn = {
  onChange: ReturnType<typeof useInput>['onChange']
  onFocus: () => void
  onBlur: () => void
  selectedUserDatas: UserDatas
  setSelectedUserDatas: Dispatch<SetStateAction<UserDatas>>
  userDatas: UserDatas
  shouldShowResult: boolean
}

export const useSearchMember = (): UseSearchMemberReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const { value, onChange } = useInput('')
  const debouncedInputText = useDebounce<string>(value, 500)
  const [searchSameCompanyUsers, searchResult] = useSearchSameCompanyUsersMutation()
  const [userDatas, setUserDatas] = useState<UserDatas>([])
  const [selectedUserDatas, setSelectedUserDatas] = useState<UserDatas>([])
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
        selectUserIds: selectedUserDatas.map(data => data.id),
        name: debouncedInputText,
        company: currentUserData.data?.user.company ? currentUserData.data.user.company : '',
      },
    })
  }, [debouncedInputText])

  useEffect(() => {
    const newUserDatas = searchResult.data?.searchSameCompanyUsers
    if (!newUserDatas?.length) {
      setUserDatas([])
      return
    }

    if (JSON.stringify(userDatas) === JSON.stringify(newUserDatas)) return
    setUserDatas(newUserDatas)
  }, [searchResult.data])

  return {
    onChange,
    onFocus,
    onBlur,
    selectedUserDatas,
    setSelectedUserDatas,
    userDatas,
    shouldShowResult,
  }
}
