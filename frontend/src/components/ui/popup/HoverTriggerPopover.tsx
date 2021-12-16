import React, { FCX, ComponentProps } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BasicPopover } from 'components/ui/popup/BasicPopover'

type Props = ComponentProps<typeof BasicPopover>

const outerTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.MuiPaper-root': {
            '&.MuiPaper-elevation': {
              '&.MuiPaper-rounded': {
                '&.MuiPaper-elevation8': {
                  '&.MuiPopover-paper': {
                    background: 'none',
                    boxShadow: 'none',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

/**
 * muiのpopoverを使ってホバーポップオーバーを実装しようとすると、自動的に後ろにoverlayが追加されてしまうため、mouseoverイベントがoverlayに邪魔されて発火しなくなってしまう。  
 *
 * そのため、mouseenterする要素内にmouseoverイベントを付与するのではなく、popoverに渡すchildrenの中にmouseoverする要素と同じ位置に表示するダミー要素を追加する必要がる。  
 *
 * しかし、ダミー要素の周りに余分な背景や影が追加されてしまうため、それを防止するためのコンポーネント
 */
export const HoverTriggerPopover: FCX<Props> = ({ children, ...props }) => (
  <ThemeProvider theme={outerTheme}>
    <BasicPopover {...props}>{children}</BasicPopover>
  </ThemeProvider>
)
