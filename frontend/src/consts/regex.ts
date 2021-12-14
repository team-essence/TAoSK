export const REGEX_EMAIL =
  /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,50}\.[A-Za-z0-9]{2,20}$/

export const REGEX_PASSWORD = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,50}$/i

// TODO: no-irregular-whitespaceエラーが発生するため
/*eslint no-irregular-whitespace: off*/
export const REGEX_TEXT = /^(?!.*[ 　\r\n\t]).*(?=^.{1,50}).*$/
