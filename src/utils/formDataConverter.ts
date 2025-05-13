import type { FormDataValues } from '@/types'

export const objectToFormData = (data: FormDataValues) => {
  const formData = new FormData()

  formData.append('username', data.username)
  formData.append('password', data.password)
  formData.append('confirmPassword', data.confirmPassword)
  formData.append('interests', JSON.stringify(data.interests))

  if (data.avatar && data.avatar.length > 0) {
    formData.append('avatar', data.avatar[0])
  }
  return formData
}
