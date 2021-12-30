import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useSearchSameCompanyUsersMutation } from 'pages/projectList/projectList.gen'
import type { UserData } from 'types/userData'

type UseSearchSameCompanyMemberArg = {
  userData: UserData
  shouldCache: boolean
}

type UseSearchSameCompanyMemberReturn = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  selectedUserData: UserData
  setSelectedUserData: Dispatch<SetStateAction<UserData>>
  candidateUserData: UserData
  shouldShowResult: boolean
  value: string
}

type UseSearchSameCompanyMember = (
  arg: UseSearchSameCompanyMemberArg,
) => UseSearchSameCompanyMemberReturn

let cachedSelectedUserData: UserData = []

/**
 * 同じ会社のメンバーを検索するために必要な処理の一群
 * @return {UseSearchSameCompanyMemberReturn} returns
 * @return {ReturnType<typeof useInput>['onChange']} returns.onChange - 検索欄を入力した時にテキストを参照し続けるため使う
 * @return {() => void} returns.onFocus - 検索結果を表示する
 * @return {() => void} returns.onBlur - 検索結果を非表示にする
 * @return {UserData} returns.selectedUserData - 検索結果から選択したユーザーデータの配列
 * @return {Dispatch<SetStateAction<UserData>>} returns.setSelectedUserData
 * @return {UserData} returns.candidateUserData - 検索結果のユーザーデータの配列
 * @return {boolean} returns.shouldShowResult - 検索結果を表示するか
 * @return {string} returns.value - 検索欄に入力するinputタグのvalue
 * @return {Dispatch<SetStateAction<string>>} returns.setValue - 検索欄のinputタグのvalueを操作する
 */
export const useSearchSameCompanyMember: UseSearchSameCompanyMember = ({
  userData,
  shouldCache,
}) => {
  const { currentUserData } = useGetCurrentUserData()
  const [value, setValue] = useState<string>('')
  const debouncedInputText = useDebounce<string>(value, 500)
  const [searchSameCompanyUsers, searchResult] = useSearchSameCompanyUsersMutation()
  const [candidateUserData, setCandidateUserData] = useState<UserData>([])
  const [selectedUserData, setSelectedUserData] = useState<UserData>(
    shouldCache && cachedSelectedUserData.length ? cachedSelectedUserData : userData,
  )
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const onFocus = () => setShouldShowResult(true)
  const onBlur = () => setShouldShowResult(false)

  useEffect(() => {
    // タスク作成後に選択済のユーザーを初期化する
    if (!userData.length && JSON.stringify(userData) !== JSON.stringify(selectedUserData)) {
      setSelectedUserData(userData)
      setValue('')
      cachedSelectedUserData = []
    }

    return () => {
      if (shouldCache) cachedSelectedUserData = selectedUserData
    }
  }, [userData])

  useEffect(() => {
    if (!debouncedInputText) {
      setCandidateUserData([])
      return
    }
    searchSameCompanyUsers({
      variables: {
        selectUserIds: selectedUserData.map(data => data.id),
        name: debouncedInputText,
        company: currentUserData?.company ? currentUserData.company : '',
      },
    })
  }, [debouncedInputText, selectedUserData])

  useEffect(() => {
    const newUserData = searchResult.data?.searchSameCompanyUsers
    if (!newUserData?.length) {
      setCandidateUserData([])
      return
    }

    if (JSON.stringify(candidateUserData) === JSON.stringify(newUserData)) return
    setCandidateUserData(newUserData)
  }, [searchResult.data])

  useEffect(() => () => setValue(''), [])

  return {
    onChange,
    onFocus,
    onBlur,
    selectedUserData,
    setSelectedUserData,
    candidateUserData,
    shouldShowResult,
    value,
  }
}
