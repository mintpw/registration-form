export const isValidImageType = (file: File) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
  return validTypes.includes(file.type)
}
