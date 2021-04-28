export const convertStringToFloat = (valueToConvert) => {
  if (valueToConvert && typeof valueToConvert === 'string') {
    // eslint-disable-next-line
    const stringReplaced = valueToConvert.replace(/[^\d\.]/g, '')
    return parseFloat(stringReplaced)
  }
  return 0
}
