import React, { FC, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'
import { Modal } from 'components/ui/modal/Modal'

type Props = {
  shouldShow: boolean
  setShouldShow: Dispatch<SetStateAction<boolean>>
  className?: string
}

export const TaskCreateModal: FC<Props> = ({ shouldShow, setShouldShow, className }) => {
  return (
    <Modal
      title="タスク作成"
      shouldShow={shouldShow}
      onClickCloseBtn={() => setShouldShow(false)}
      className={className}>
      <h1>hoge!?</h1>
      <p>hogehoge</p>
      <button onClick={() => setShouldShow(false)}>非表示</button>
    </Modal>
  )
}
