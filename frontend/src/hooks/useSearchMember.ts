import { useState, useEffect, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { useDebounce } from 'hooks/useDebounce'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useSearchSameCompanyUsersMutation } from 'pages/projectList/projectList.gen'
import type { UserDatas } from 'types/userDatas'
import type { TaskModalType } from 'types/taskModal'

type UseSearchMemberReturn = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  selectedUserDatas: UserDatas
  setSelectedUserDatas: Dispatch<SetStateAction<UserDatas>>
  candidateUserDatas: UserDatas
  shouldShowResult: boolean
  value: string
}

let cachedSelectedUserDatas: UserDatas = []

/**
 * メンバーを検索するために必要な処理の一群
 * @return {UseSearchMemberReturn} returns
 * @return {ReturnType<typeof useInput>['onChange']} returns.onChange - 検索欄を入力した時にテキストを参照し続けるため使う
 * @return {() => void} returns.onFocus - 検索結果を表示する
 * @return {() => void} returns.onBlur - 検索結果を非表示にする
 * @return {UserDatas} returns.selectedUserDatas - 検索結果から選択したユーザーデータの配列
 * @return {Dispatch<SetStateAction<UserDatas>>} returns.setSelectedUserDatas
 * @return {UserDatas} returns.candidateUserDatas - 検索結果のユーザーデータの配列
 * @return {boolean} returns.shouldShowResult - 検索結果を表示するか
 * @return {string} returns.value - 検索欄に入力するinputタグのvalue
 * @return {Dispatch<SetStateAction<string>>} returns.setValue - 検索欄のinputタグのvalueを操作する
 */
export const useSearchMember = (
  userDatas: UserDatas,
  type: TaskModalType,
): UseSearchMemberReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const [value, setValue] = useState<string>('')
  const debouncedInputText = useDebounce<string>(value, 500)
  const [searchSameCompanyUsers, searchResult] = useSearchSameCompanyUsersMutation()
  const [candidateUserDatas, setCandidateUserDatas] = useState<UserDatas>([])
  const [selectedUserDatas, setSelectedUserDatas] = useState<UserDatas>(
    type === 'create' && cachedSelectedUserDatas.length ? cachedSelectedUserDatas : userDatas,
  )
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const onFocus = () => setShouldShowResult(true)
  const onBlur = () => setShouldShowResult(false)

  useEffect(() => {
    // タスク作成後に選択済のユーザーを初期化する
    if (!userDatas.length && JSON.stringify(userDatas) !== JSON.stringify(selectedUserDatas)) {
      setSelectedUserDatas(userDatas)
      setValue('')
      cachedSelectedUserDatas = []
    }

    return () => {
      if (type === 'create') cachedSelectedUserDatas = selectedUserDatas
    }
  }, [userDatas])

  useEffect(() => {
    if (!debouncedInputText) {
      setCandidateUserDatas([])
      return
    }
    searchSameCompanyUsers({
      variables: {
        selectUserIds: selectedUserDatas.map(data => data.id),
        name: debouncedInputText,
        company: currentUserData.data?.user.company ? currentUserData.data.user.company : '',
      },
    })
  }, [debouncedInputText, selectedUserDatas])

  useEffect(() => {
    const newUserDatas = searchResult.data?.searchSameCompanyUsers
    if (!newUserDatas?.length) {
      setCandidateUserDatas([])
      return
    }

    if (JSON.stringify(candidateUserDatas) === JSON.stringify(newUserDatas)) return
    setCandidateUserDatas(newUserDatas)
  }, [searchResult.data])

  useEffect(() => () => setValue(''), [])

  return {
    onChange,
    onFocus,
    onBlur,
    selectedUserDatas,
    setSelectedUserDatas,
    candidateUserDatas,
    shouldShowResult,
    value,
  }
}
