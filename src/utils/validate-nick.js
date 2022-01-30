export const validateNick = nickname => {
  // define pattern
  const re = /^(^[^0-9])([\w a-z A-Z 0-9][^@#])$/

  // check if conforms to pattern
  return re.test(nickname)
}
