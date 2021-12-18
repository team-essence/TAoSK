import { useCallback, ComponentProps } from 'react'
// import { useUpdateCertificationMutation, useUpdateInterestsMutation } from 'pages/mypage/mypage.gen'
// import { NewCertificationInput, NewInterestInput } from 'types/graphql.gen'
import { MyPageEditTagsModal } from 'components/models/myPage/MyPageEditTagsModal'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useMyPageEditTagModal } from 'hooks/useMyPageEditTagModal'
import toast from 'utils/toast/toast'

type UseUpdateInterestsAndCertificatesArg = {
  initialCertificates: string[]
  initialInterests: string[]
}

type EditModalProps = Pick<
  ComponentProps<typeof MyPageEditTagsModal>,
  'items' | 'setItems' | 'disabled' | 'onClickSaveButton'
>

type UseUpdateInterestsAndCertificatesReturn = {
  certificatesModalProps: EditModalProps
  interestsModalProps: EditModalProps
}

type UseUpdateInterestsAndCertificates = (
  arg: UseUpdateInterestsAndCertificatesArg,
) => UseUpdateInterestsAndCertificatesReturn

/**
 * 資格・興味の更新処理
 */
export const useUpdateInterestsAndCertificates: UseUpdateInterestsAndCertificates = ({
  initialInterests,
  initialCertificates,
}) => {
  const { currentUserData } = useGetCurrentUserData()
  const certificatesTagInfo = useMyPageEditTagModal(initialCertificates)
  const interestsTagInfo = useMyPageEditTagModal(initialInterests)
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
    console.log(certificatesTagInfo.items)
  }, [certificatesTagInfo.items])

  const onClickSaveInterestsButton = useCallback(() => {
    console.log(interestsTagInfo.items)
  }, [interestsTagInfo.items])

  return {
    certificatesModalProps: {
      onClickSaveButton: onClickSaveCertificatesButton,
      ...certificatesTagInfo,
    },
    interestsModalProps: {
      onClickSaveButton: onClickSaveInterestsButton,
      ...interestsTagInfo,
    },
  }
}
