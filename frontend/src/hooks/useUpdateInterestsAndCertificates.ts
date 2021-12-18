import { Dispatch, SetStateAction, useState, useCallback, useMemo } from 'react'
// import { useUpdateCertificationMutation, useUpdateInterestsMutation } from 'pages/mypage/mypage.gen'
// import { NewCertificationInput, NewInterestInput } from 'types/graphql.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import toast from 'utils/toast/toast'
import { max } from 'consts/certificationsAndInterests'

type UseUpdateInterestsAndCertificatesArg = {
  initialCertificates: string[]
  initialInterests: string[]
}

type UseUpdateInterestsAndCertificatesReturn = {
  modalCertificates: string[]
  setModalCertificates: Dispatch<SetStateAction<string[]>>
  modalInterests: string[]
  setModalInterests: Dispatch<SetStateAction<string[]>>
  onClickSaveCertificatesButton: () => void
  onClickSaveInterestsButton: () => void
  disabledCertificatesInput: boolean
  disabledInterestsInput: boolean
}

type UseUpdateInterestsAndCertificates = (
  arg: UseUpdateInterestsAndCertificatesArg,
) => UseUpdateInterestsAndCertificatesReturn

const getShouldDisabled = (initialItems: string[], items: string[]) =>
  JSON.stringify(initialItems.sort()) === JSON.stringify(items.sort()) ||
  items.length > max.ITEMS ||
  !!items.find(v => v.length > max.TEXT_LENGTH)

/**
 * 資格・興味の更新処理
 */
export const useUpdateInterestsAndCertificates: UseUpdateInterestsAndCertificates = ({
  initialInterests,
  initialCertificates,
}) => {
  const { currentUserData } = useGetCurrentUserData()
  const [modalCertificates, setModalCertificates] = useState<string[]>(initialCertificates)
  const [modalInterests, setModalInterests] = useState<string[]>(initialInterests)
  const disabledCertificatesInput = useMemo(
    () => getShouldDisabled(initialCertificates, modalCertificates),
    [initialCertificates, modalCertificates],
  )
  const disabledInterestsInput = useMemo(
    () => getShouldDisabled(initialInterests, modalInterests),
    [initialInterests, modalInterests],
  )
  // TODO: mutationが追加されたら実装する
  // const [updateCertificates] = useUpdateCertificationMutation({
  //   onCompleted(data) {
  //     toast.success('保有資格を更新しました')
  //   },
  //   onError(err) {
  //     toast.error('保有資格の変更に失敗しました')
  //   },
  // })
  // const [updateInterests] = useUpdateInterestsMutation({
  //   onCompleted(data) {
  //     toast.success('興味のあることを更新しました')
  //   },
  //   onError(err) {
  //     toast.error('興味のあることの変更に失敗しました')
  //   },
  // })

  const onClickSaveCertificatesButton = useCallback(() => {
    console.log(modalCertificates)
  }, [modalCertificates])

  const onClickSaveInterestsButton = useCallback(() => {
    console.log(modalInterests)
  }, [modalInterests])

  return {
    modalCertificates,
    setModalCertificates,
    modalInterests,
    setModalInterests,
    onClickSaveCertificatesButton,
    onClickSaveInterestsButton,
    disabledCertificatesInput,
    disabledInterestsInput,
  }
}
