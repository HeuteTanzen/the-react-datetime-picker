// @flow
export const paddedStr = (nr: number) => nr > 9 ? `${nr}` : `0${nr}`

const POSSIBLE_TOKENS = 'YMDHm'.split('')

const tokenizer = (str: string, format: string): ?Object => {
  const chars = str.split('')
  let result = POSSIBLE_TOKENS.reduce((memo, token) => ({
    ...memo,
    [token]: []
  }), {})
  let missingChars = 0

  for (let index = 0, l = format.length; index < l; ++index) {
    const char = chars[missingChars + index]
    const lastChar = chars[missingChars + index - 1]
    const token = format[index]
    if (POSSIBLE_TOKENS.indexOf(token) !== -1) {
      result[token].push(char)
    } else if (char !== token) {
      if (token === lastChar) {
        // If user left out a char (e.g. 5:00 instead of 05:00, it's still ok)
        --missingChars
      } else {
        // The input does not match format
        return null
      }
    }
  }
  return result
}

export const parseDateString = (str: string, format: string): ?Date => {
  const tokens = tokenizer(str, format)
  return tokens
    ? new Date(
      parseInt(tokens.Y.join(''), 10),
      parseInt(tokens.M.join(''), 10) - 1,
      parseInt(tokens.D.join(''), 10),
      parseInt(tokens.H.join(''), 10) || 0,
      parseInt(tokens.m.join(''), 10) || 0
    )
    : null
}
