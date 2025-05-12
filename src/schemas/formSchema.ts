import { ERROR_MESSAGES } from '@/constants'
import * as z from 'zod'

export const formSchema = z
  .object({
    username: z
      .string({ required_error: ERROR_MESSAGES.authForm.username.required })
      .min(1, { message: ERROR_MESSAGES.authForm.username.minLength }),
    password: z
      .string({ required_error: ERROR_MESSAGES.authForm.password.required })
      .min(8, { message: ERROR_MESSAGES.authForm.password.minLength }),
    confirmPassword: z
      .string({
        required_error: ERROR_MESSAGES.authForm.confirmPassword.required,
      })
      .min(1, { message: ERROR_MESSAGES.authForm.confirmPassword.required })
      .min(8, { message: ERROR_MESSAGES.authForm.confirmPassword.minLength }),
    interests: z
      .array(z.string(), {
        required_error: ERROR_MESSAGES.authForm.interests.required,
      })
      .min(1, { message: ERROR_MESSAGES.authForm.interests.minLength }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: ERROR_MESSAGES.authForm.confirmPassword.mismatch,
        path: ['confirmPassword'],
      })
    }
  })

export const avatarUploadSchema = z.object({
  avatar: z.custom<FileList>().refine(
    (fileList) => {
      console.log('refine', fileList)

      if (!fileList) return false
      return fileList instanceof FileList && fileList.length > 0
    },
    {
      message: ERROR_MESSAGES.authForm.avatar.required,
    }
  ),
})
