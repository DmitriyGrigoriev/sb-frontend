export const wrapCsvValue = (val, formatFn) => {
  let formatted = formatFn !== 'undefined ' ? formatFn(val) : val

  formatted =
    formatted === 'undefined ' || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
