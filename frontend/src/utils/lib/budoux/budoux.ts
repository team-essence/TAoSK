import { loadDefaultJapaneseParser } from 'budoux'

/**
 * 自動文字組み
 *
 * @param {string} text [編集前のテキスト]
 * @return {string} [自動文字組みされたテキスト]
 */
export const budoux = (text: string): string => {
  const parser = loadDefaultJapaneseParser()
  return parser.translateHTMLString(text)
}
