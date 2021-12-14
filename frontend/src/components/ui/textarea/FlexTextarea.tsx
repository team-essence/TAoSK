import React, {
  FCX,
  TextareaHTMLAttributes,
  useState,
  useCallback,
  ChangeEventHandler,
  Ref,
  forwardRef,
} from 'react'
import styled from 'styled-components'

type Props = {
  ref: Ref<HTMLTextAreaElement>
  initialVal?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const FlexTextarea: FCX<Props> = forwardRef<HTMLTextAreaElement, Omit<Props, 'ref'>>(
  ({ className, initialVal = '', onChange, ...textareaAttributes }, ref) => {
    const [text, setText] = useState<string>(initialVal + '\u200b')
    const onChangeTextarea = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      e => {
        onChange && onChange(e)
        setText(e.target.value + '\u200b')
      },
      [onChange],
    )

    return (
      <StyledTextareaWrapper className={className}>
        <StyledTextareaDummy aria-hidden="false">{text}</StyledTextareaDummy>
        <StyledTextarea ref={ref} {...textareaAttributes} onChange={onChangeTextarea} />
      </StyledTextareaWrapper>
    )
  },
)
FlexTextarea.displayName = 'FlexTextarea'

const StyledTextareaWrapper = styled.div`
  position: relative;
`
const StyledTextareaDummy = styled.div`
  overflow: hidden;
  visibility: hidden;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
`
const StyledTextarea = styled.textarea`
  resize: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font: inherit;
  letter-spacing: inherit;
`
