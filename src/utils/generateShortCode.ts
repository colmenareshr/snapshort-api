export function generateShortCode(length: number = 5): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let shortCode = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    shortCode += characters.charAt(randomIndex)
  }
  return shortCode
}
