import React, { FCX, useMemo, useState } from 'react'
import { MyPageEditTagsModal } from 'components/models/myPage/MyPageEditTagsModal'
import { EditButton } from 'components/ui/button/EditButton'
import styled from 'styled-components'
import { useUpdateInterestsAndCertificates } from 'hooks/useUpdateInterestsAndCertificates'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { Tag, TAG_TYPE } from 'components/ui/tag/Tag'

type Props = {
  interests: {
    __typename?: 'Interest' | undefined
    id: number
    context: string
  }[]
  certifications: {
    __typename?: 'Certification' | undefined
    id: number
    name: string
  }[]
}

export const MyPageTags: FCX<Props> = ({ className, interests, certifications }) => {
  const [shouldShowCertificatesEditModal, setShouldShowCertificatesEditModal] =
    useState<boolean>(false)
  const [shouldShowInterestsEditModal, setShouldShowInterestsEditModal] = useState<boolean>(false)
  const interestContexts: string[] = useMemo(() => interests.map(v => v.context), [interests])
  const certificationNames: string[] = useMemo(
    () => certifications.map(v => v.name),
    [certifications],
  )
  const {
    modalCertificates,
    setModalCertificates,
    modalInterests,
    setModalInterests,
    onClickSaveCertificatesButton,
    onClickSaveInterestsButton,
    disabledCertificatesInput,
    disabledInterestsInput,
  } = useUpdateInterestsAndCertificates({
    initialCertificates: certificationNames,
    initialInterests: interestContexts,
  })

  return (
    <StyledMyPageTagsContainer className={className}>
      <StyledMyPageTagsScroll>
        <StyledMyPageTagTitle>
          <h4>保有資格</h4>
          <StyledEditButton onClick={() => setShouldShowCertificatesEditModal(true)} />
          <MyPageEditTagsModal
            title="保有資格"
            shouldShow={shouldShowCertificatesEditModal}
            closeModal={() => setShouldShowCertificatesEditModal(false)}
            items={modalCertificates}
            setItems={setModalCertificates}
            onClickSaveButton={onClickSaveCertificatesButton}
            disabled={disabledCertificatesInput}
          />
        </StyledMyPageTagTitle>

        <StyledMyPageTagWrapper>
          {interestContexts.map((interest, index) => (
            <Tag name={interest} key={index} tagType={TAG_TYPE.NORMAL} />
          ))}
        </StyledMyPageTagWrapper>

        <StyledMyPageTagTitle>
          <h4>興味のあること</h4>
          <StyledEditButton onClick={() => setShouldShowInterestsEditModal(true)} />
          <MyPageEditTagsModal
            title="興味のあること"
            shouldShow={shouldShowInterestsEditModal}
            closeModal={() => setShouldShowInterestsEditModal(false)}
            items={modalInterests}
            setItems={setModalInterests}
            onClickSaveButton={onClickSaveInterestsButton}
            disabled={disabledInterestsInput}
          />
        </StyledMyPageTagTitle>

        <StyledMyPageTagWrapper>
          {certificationNames.map((certification, index) => (
            <Tag name={certification} key={index} tagType={TAG_TYPE.NORMAL} />
          ))}
        </StyledMyPageTagWrapper>
      </StyledMyPageTagsScroll>

      <StyledMyPageTagsBackground src="/svg/user-tags_background.svg" alt="タグの背景画像" />
    </StyledMyPageTagsContainer>
  )
}

const StyledMyPageTagsContainer = styled.div`
  position: relative;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`

const StyledMyPageTagsScroll = styled.div`
  padding-top: 4px;
  position: absolute;
  top: 48%;
  left: 53%;
  transform: translate(-50%, -50%);
  width: ${calculateMinSizeBasedOnFigmaWidth(420)};
  height: ${calculateMinSizeBasedOnFigmaWidth(260)};
  overflow-y: scroll;
  direction: rtl;
`

const StyledMyPageTagTitle = styled.div`
  direction: ltr;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${calculateMinSizeBasedOnFigmaWidth(11)};

  h4 {
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
    color: ${({ theme }) => theme.COLORS.BIZARRE};
  }

  &:nth-child(3) {
    margin-top: ${calculateMinSizeBasedOnFigmaWidth(39)};
  }
`

const StyledEditButton = styled(EditButton)``

const StyledMyPageTagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${calculateMinSizeBasedOnFigmaWidth(16)};
  direction: ltr;
`

const StyledMyPageTagsBackground = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(535)};
`
