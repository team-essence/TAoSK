import { useCallback, ComponentProps } from 'react'
import {
  useUpdateCertificationsMutation,
  useUpdateInterestsMutation,
} from 'pages/mypage/mypage.gen'
import { MyPageEditTagsModal } from 'components/models/myPage/MyPageEditTagsModal'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useMyPageEditTagModal } from 'hooks/useMyPageEditTagModal'
import toast from 'utils/toast/toast'

type UseUpdateInterestsAndCertificationsArg = {
  initialCertifications: string[]
  initialInterests: string[]
}

type EditModalProps = Pick<
  ComponentProps<typeof MyPageEditTagsModal>,
  'items' | 'setItems' | 'disabled' | 'shouldShow' | 'setShouldShow' | 'onClickSaveButton'
>

type UseUpdateInterestsAndCertificationsReturn = {
  certificationsModalProps: EditModalProps
  interestsModalProps: EditModalProps
}

type UseUpdateInterestsAndCertifications = (
  arg: UseUpdateInterestsAndCertificationsArg,
) => UseUpdateInterestsAndCertificationsReturn

/**
 * 資格・興味の更新処理
 */
export const useUpdateInterestsAndCertifications: UseUpdateInterestsAndCertifications = ({
  initialCertifications,
  initialInterests,
}) => {
  const { currentUserData } = useGetCurrentUserData()
  const certificationsTagInfo = useMyPageEditTagModal(initialCertifications)
  const interestsTagInfo = useMyPageEditTagModal(initialInterests)
  const [updateCertifications] = useUpdateCertificationsMutation({
    onCompleted(data) {
      certificationsTagInfo.setShouldShow(false)
      toast.success('保有資格を更新しました')
    },
    onError(err) {
      interestsTagInfo.setShouldShow(false)
      toast.error('保有資格の変更に失敗しました')
    },
  })
  const [updateInterests] = useUpdateInterestsMutation({
    onCompleted(data) {
      interestsTagInfo.setShouldShow(false)
      toast.success('興味のあることを更新しました')
    },
    onError(err) {
      toast.error('興味のあることの変更に失敗しました')
    },
  })

  const onClickSaveCertificationsButton = useCallback(() => {
    if (!currentUserData.data?.user.id) return
    updateCertifications({
      variables: {
        names: certificationsTagInfo.items,
        user_id: currentUserData.data.user.id,
      },
    })
  }, [currentUserData.data?.user.id, certificationsTagInfo.items])

  const onClickSaveInterestsButton = useCallback(() => {
    if (!currentUserData.data?.user.id) return
    updateInterests({
      variables: {
        contexts: interestsTagInfo.items,
        user_id: currentUserData.data.user.id,
      },
    })
  }, [currentUserData.data?.user.id, interestsTagInfo.items])

  return {
    certificationsModalProps: {
      onClickSaveButton: onClickSaveCertificationsButton,
      ...certificationsTagInfo,
    },
    interestsModalProps: {
      onClickSaveButton: onClickSaveInterestsButton,
      ...interestsTagInfo,
    },
  }
}
