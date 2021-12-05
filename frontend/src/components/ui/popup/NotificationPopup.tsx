import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { theme } from 'styles/theme'
import { CoverPopup, POPUP_TYPE } from 'components/ui/popup/CoverPopup'
import date from 'utils/date/date'

type Props = {
  className?: string
}

export const NotificationPopup: FC<Props> = ({ className }) => {
  return (
    <StyledNotificationPopupContainer
      className={className}
      title="通知"
      popupType={POPUP_TYPE.NORMAL}>
      <StyledInvitationItem>
        <StyledInvitationText>
          <span>【】</span>
          に招待されました
        </StyledInvitationText>

        <StyledInvitationUrlContainer>
          <p>
            URL : <a href="https://">https://</a>
          </p>
        </StyledInvitationUrlContainer>

        <StyledInvitationTimeContainer>
          <p>{date.formatDay('2021-12-11')}</p>
        </StyledInvitationTimeContainer>
      </StyledInvitationItem>
    </StyledNotificationPopupContainer>
  )
}

const StyledNotificationPopupContainer = styled(CoverPopup)``

// TODO: 今後招待以外の通知実装された時のために名前にinvitationを入れている
const StyledInvitationItem = styled.div`
  padding: ${calculateMinSizeBasedOnFigmaWidth(12)} 0;
  width: ${calculateMinSizeBasedOnFigmaWidth(312)};
`

const StyledInvitationText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.FONT.BLACK};

  span {
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  }
`

const StyledInvitationUrlContainer = styled.div`
  margin: ${calculateMinSizeBasedOnFigmaWidth(8)} 0;
  padding: ${calculateMinSizeBasedOnFigmaWidth(8)} ${calculateMinSizeBasedOnFigmaWidth(12)};
  border: solid ${calculateMinSizeBasedOnFigmaWidth(1)} ${({ theme }) => theme.COLORS.SILVER};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};

  p {
    line-height: 0;
  }
`

const StyledInvitationTimeContainer = styled.div`
  p {
    line-height: 0;
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
    color: ${({ theme }) => theme.COLORS.TOPAZ};
  }
`
