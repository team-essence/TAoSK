import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react'
import { useDebounce } from 'hooks/useDebounce'
import type { UserData } from 'types/userData'
import type { Groups } from 'types/groups'

type UseSearchSameProjectMemberArg = {
  userData: UserData
  shouldCache: boolean
} & Groups

type UseSearchSameProjectMemberReturn = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus: () => void
  onBlur: () => void
  selectedUserData: UserData
  setSelectedUserData: Dispatch<SetStateAction<UserData>>
  candidateUserData: UserData
  shouldShowResult: boolean
  value: string
}

type UseSearchSameProjectMember = (
  arg: UseSearchSameProjectMemberArg,
) => UseSearchSameProjectMemberReturn

let cachedSelectedUserData: UserData = []

/**
 * 同じプロジェクト内のメンバーを検索するために必要な処理の一群
 * @return {UseSearchSameProjectMemberReturn} returns
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
export const useSearchSameProjectMember: UseSearchSameProjectMember = ({
  groups,
  userData,
  shouldCache,
}) => {
  const sameCompanyUsers = useMemo<UserData>(() => groups.map(group => group.user), [groups])
  const [value, setValue] = useState<string>('')
  const debouncedInputText = useDebounce<string>(value, 500)
  const [searchResult, setSearchResult] = useState<UserData>([])
  const [candidateUserData, setCandidateUserData] = useState<UserData>([])
  const [selectedUserData, setSelectedUserData] = useState<UserData>(
    shouldCache && cachedSelectedUserData.length ? cachedSelectedUserData : userData,
  )
  const [shouldShowResult, setShouldShowResult] = useState<boolean>(false)
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [])
  const onFocus = useCallback(() => setShouldShowResult(true), [])
  const onBlur = useCallback(() => setShouldShowResult(false), [])

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
    const selectedUserIds = selectedUserData.map(datum => datum.id)
    const result = sameCompanyUsers.filter(
      v =>
        (v.id.includes(debouncedInputText) || v.name.includes(debouncedInputText)) &&
        !selectedUserIds.includes(v.id),
    )
    setSearchResult(result)
  }, [debouncedInputText, selectedUserData])

  useEffect(() => {
    if (!searchResult) {
      setCandidateUserData([])
      return
    }

    if (JSON.stringify(candidateUserData) === JSON.stringify(searchResult)) return
    setCandidateUserData(searchResult)
  }, [searchResult])

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
